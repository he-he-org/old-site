import rest from "rest"
import mime from "rest/interceptor/mime"
import template from "rest/interceptor/template"
import errorCode from "rest/interceptor/errorCode"
import {merge} from "functional-utils"

const client = rest
    .wrap(mime, {mime: "application/json"})
    .wrap(template)
    .wrap(errorCode)

export const fetchCollection = (collection, params = {}) => {
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

    return client({
        method: "GET",
        params: extParams,
        path: `/api/${collection.name}{?page}{&expand}`,
    }).then((result) => {
        return {
            pagination: {
                currentPage: parseInt(result.headers["X-Pagination-Current-Page"], 10),
                pageCount: parseInt(result.headers["X-Pagination-Page-Count"], 10),
                perPage: parseInt(result.headers["X-Pagination-Per-Page"], 10),
                totalCount: parseInt(result.headers["X-Pagination-Total-Count"], 10),
            },
            data: result.entity,
        }
    })
}

export const patchRecord = (collection, record) => {
    return client({path: `/api/${collection.name}/${record.id}`, method: "PATCH", entity: record})
}

export const postRecord = (collection, record) => {
    return client({path: `/api/${collection.name}`, method: "POST", entity: record})
}

export const deleteRecord = (collection, record) => {
    return client({path: `/api/${collection.name}/${record.id}`, method: "DELETE"})
}
