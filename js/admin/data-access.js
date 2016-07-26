import {merge} from "functional-utils"
import Api from "./api"


export default function (config) {

    const api = Api(config)

    return {
        fetchCollection(collection, params = {}) {
            const expand = []
            collection.attrs.forEach((attr) => {
                if (attr.type === "manyToOne" || attr.type === "manyToMany") {
                    expand.push(attr.name)
                }
            })

            let extParams = params

            if (expand.length > 0) {
                extParams = merge(extParams, {
                    expand: expand.join(","),
                })
            }

            return api.fetchCollection(collection, extParams)
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

