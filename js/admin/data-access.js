import {merge} from "functional-utils"
import Api from "./api"

const helper = (api, collection, params = {}, expandings, scheme) => {
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

    let embededExpandings = expandings.filter((x) => Array.isArray(x)) //todo: es6 only?

    return api.fetchCollection(collection, extParams).then((result) => {
        const expandingPromises = embededExpandings.map((exp) => {
            const attrName = exp[0]
            const attr = collection.attrs.filter((x) => x.name === attrName)[0]
            const collectionScheme = scheme.filter((x) => x.name === attr[attr.type].to)[0]
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

            const subParams = {q: `id:[${ids.join(",")}]`} //todo: ids could be empty
            return helper(api, collectionScheme, subParams, expandings, scheme).then((result) => {
                return {
                    attr,
                    entities: result.data,
                }
            })
        })

        return Promise.all(expandingPromises).then((results) => {
            const newData = result.data.map((record) => {
                const newRecord = merge({}, record)
                results.forEach(({attr, entities}) => {
                    if (attr.type === "manyToMany") {
                        const objectsToReplace = entities.filter((x) => {
                            return newRecord[attr.name].filter((y) => y.id === x.id).length > 0
                        })
                        newRecord[attr.name] = objectsToReplace
                    }
                    else if (attr.type === "manyToOne") {
                        const objectsToReplace = entities.filter((x) => {
                            return newRecord[attr.name].id === x.id
                        })
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

export default function(config) {

    const {expandings, scheme, api: apiConfig} = config

    const api = Api(apiConfig)

    return {
        fetchCollection(collection, params = {}) {
            const collectionExpandings = expandings[collection.name]

            return helper(api, collection, params, collectionExpandings, scheme)


            //const expand = []
            //collection.attrs.forEach((attr) => {
            //    if (attr.type === "manyToOne" || attr.type === "manyToMany") {
            //        expand.push(attr.name)
            //    }
            //})
            //
            //let extParams = params
            //
            //if (expand.length > 0) {
            //    extParams = merge(extParams, {
            //        expand: expand.join(","),
            //    })
            //}
            //
            //return api.fetchCollection(collection, extParams).then((result) => {
            //    collection.attrs
            //        .filter((attr) => attr.type === "manyToOne" || attr.type === "manyToMany")
            //        .forEach((attr) => {
            //            const attrParams = attr[attr.type]
            //            if (attr.type === "manyToOne") {
            //                const ids = result.data.map((record) => record[attr.name].id)
            //                const toScheme = scheme.filter((x) => x.name === attrParams.to)[0]
            //
            //                //todo: need to pass big page size to make sure to extract all objects
            //                this.fetchCollection(toScheme, {q: `id:[${ids.join(",")}]`})
            //                    .then((x) => {
            //                        //console.log("result of subquery manyToOne", attr.name, x)
            //                    })
            //
            //            }
            //            else if (attr.type === "manyToMany") {
            //                const ids = [].concat(...result.data.map((record) => record[attr.name].map(x => x.id)))
            //                console.log("ids", ids)
            //                const toScheme = scheme.filter((x) => x.name === attrParams.to)[0]
            //                //
            //                ////todo: need to pass big page size to make sure to extract all objects
            //                //this.fetchCollection(toScheme, {q: `id:[${ids.join(",")}]`})
            //                //    .then((x) => {
            //                //        console.log("result of subquery manyToOne", attr.name, x)
            //                //    })
            //            }
            //            else {
            //                //throw new Error(`Unsupported attr type: ${attr.type}`)
            //            }
            //        })
            //
            //    return result
            //})
        },

        updateRecord(scheme, resourceScheme, newRecord, oldRecord) {
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

                    return api.fetchCollection(viaResourceScheme, {
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


        createRecord(scheme, resourceScheme, newRecord) {
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

