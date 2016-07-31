import {merge} from "functional-utils"
import Api from "./api"

export default function(context) {
    const {config: {scheme, expandings}, api: apiConfig} = context

    const api = Api(apiConfig)

    return {
        fetchResource(resourceName, params = {}) {
            const resourceExpandings = expandings[resourceName]

            const helper = (resourceName, params = {}, expandings) => {
                const expand = []
                expandings.forEach((param) => {
                    if (typeof param === "string") {
                        expand.push(param)
                    }
                    else {
                        expand.push(param[0])
                    }
                })

                let extParams = params
                if (expand.length > 0) {
                    extParams = merge(extParams, {
                        expand: expand.join(","),
                    })
                }

                const embededExpandings = expandings.filter((x) => Array.isArray(x)) //todo: es6 only?

                const resourceScheme = scheme.filter((x) => x.name === resourceName)[0] //todo: check if exists

                return api.fetchResource(resourceScheme, extParams).then((result) => {
                    const expandingPromises = embededExpandings.map((exp) => {
                        const attrName = exp[0]
                        const attr = resourceScheme.attrs.filter((x) => x.name === attrName)[0]
                        const resourceName = attr[attr.type].to
                        const expandings = exp[1]
                        let ids = null
                        if (attr.type === "manyToMany") {
                            ids = [].concat(...result.data.map((record) => record[attr.name].map((x) => x.id)))
                        }
                        else if (attr.type === "manyToOne") {
                            ids = result.data.map((record) => record[attr.name].id)
                        }
                        else {
                            throw new Error(`Not supported yet: ${attr.type}`)
                        }

                        if (ids.length !== 0) {
                            const subParams = {
                                "q": `id:[${ids.join(",")}]`,
                                "per-page": ids.length,
                            }
                            return helper(resourceName, subParams, expandings)
                                .then((result) => ({attr, entities: result.data}))
                        }
                        else {
                            return {
                                attr,
                                entities: [],
                            }
                        }
                    })

                    return Promise.all(expandingPromises).then((results) => {
                        const newData = result.data.map((record) => {
                            const newRecord = merge({}, record)
                            results.forEach(({attr, entities}) => {
                                if (attr.type === "manyToMany") {
                                    const objectsToReplace = entities.filter((x) => (
                                        newRecord[attr.name].filter((y) => y.id === x.id).length > 0
                                    ))
                                    newRecord[attr.name] = objectsToReplace
                                }
                                else if (attr.type === "manyToOne") {
                                    const objectsToReplace = entities.filter((x) => (
                                        newRecord[attr.name].id === x.id
                                    ))
                                    if (objectsToReplace.length !== 1) {
                                        throw new Error(`Bad objects count: ${objectsToReplace.length}`)
                                    }
                                    newRecord[attr.name] = objectsToReplace[0]
                                }
                                else {
                                    throw new Error(`Relation type is not supported yet: ${attr.type}`)
                                }
                            })
                            return newRecord
                        })

                        return merge(result, {
                            data: newData,
                        })
                    })
                })
            }

            return helper(resourceName, params, resourceExpandings)
        },

        updateRecord(resourceName, newRecord, oldRecord) {
            const resourceScheme = scheme.filter((x) => x.name === resourceName)[0] //todo: check if exists
            const entityPromise = resourceScheme.attrs.reduce((promise, attr) => {
                if (attr.type === "manyToOne") {
                    return promise.then((entity) => (
                        merge(entity, {
                            [attr[attr.type].fromAttr]: newRecord[attr.name].id,
                        })
                    ))
                }
                else if (attr.type === "manyToMany") {
                    const oldValue = oldRecord[attr.name]
                    const newValue = newRecord[attr.name]

                    const addedObjects = newValue.filter((obj) => (
                        oldValue.filter((x) => x.id === obj.id).length === 0
                    ))

                    const removedObjects = oldValue.filter((obj) => (
                        newValue.filter((x) => x.id === obj.id).length === 0
                    ))

                    const typeParams = attr[attr.type]
                    const viaResourceScheme = scheme.filter((x) => x.name === typeParams.via)[0]

                    return api.fetchResource(viaResourceScheme, {
                        q: typeParams.fromAttr + ":" + newRecord.id,
                    }).then((result) => {
                        const links = result.data

                        const postPromises = addedObjects.map((obj) => (
                            api.postRecord(viaResourceScheme, {
                                [typeParams.fromAttr]: newRecord.id,
                                [typeParams.toAttr]: obj.id,
                            })
                        ))

                        const deletePromises = removedObjects.map((obj) => (
                            api.deleteRecord(viaResourceScheme, links.filter((x) => x[typeParams.toAttr] === obj.id)[0])
                        ))

                        return Promise.all([...postPromises, ...deletePromises]).then(() => promise)
                    })
                }
                else {
                    return promise.then((entity) => (
                        merge(entity, {
                            [attr.name]: newRecord[attr.name],
                        })
                    ))
                }
            }, Promise.resolve({}))

            return entityPromise.then((entity) => api.patchRecord(resourceScheme, entity))
        },


        createRecord(resourceName, newRecord) {
            const resourceScheme = scheme.filter((x) => x.name === resourceName)[0] //todo: check if exists

            const entityPromise = resourceScheme.attrs.reduce((promise, attr) => {
                if (attr.type === "manyToOne") {
                    return promise.then((entity) => (
                        merge(entity, {
                            [attr[attr.type].fromAttr]: newRecord[attr.name].id,
                        })
                    ))
                }
                else if (attr.type === "manyToMany") {
                    return promise
                }
                else {
                    return promise.then((entity) => (
                        merge(entity, {
                            [attr.name]: newRecord[attr.name],
                        })
                    ))
                }
            }, Promise.resolve({}))

            return entityPromise
                .then((entity) => api.postRecord(resourceScheme, entity))
                .then(({entity: insertedRecord}) => (
                    Promise.all(resourceScheme.attrs.filter((attr) => attr.type === "manyToMany").map((attr) => {
                        const value = newRecord[attr.name]

                        const typeParams = attr[attr.type]
                        const viaResourceScheme = scheme.filter((x) => x.name === typeParams.via)[0]

                        const postPromises = value.map((obj) => (
                            api.postRecord(viaResourceScheme, {
                                [typeParams.fromAttr]: insertedRecord.id,
                                [typeParams.toAttr]: obj.id,
                            })
                        ))

                        return Promise.all(postPromises)
                    }))
                ))
        },

        deleteRecord: (...attrs) => {
            return api.deleteRecord(...attrs)
        },
    }
}

