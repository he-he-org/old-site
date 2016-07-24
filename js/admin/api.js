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
    return client({
        method: "GET",
        params,
        path: `/api/${collection.name}{?page,expand,q}`,
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

export const patchRecord = (resourceScheme, record) => {
    return client({path: `/api/${resourceScheme.name}/${record.id}`, method: "PATCH", record})
}

export const postRecord = (resourceScheme, record) => {
    return client({path: `/api/${resourceScheme.name}`, method: "POST", entity: record})
}

export const deleteRecord = (resourceScheme, record) => {
    return client({path: `/api/${resourceScheme.name}/${record.id}`, method: "DELETE"})
}
