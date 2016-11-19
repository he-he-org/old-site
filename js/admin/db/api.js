import rest from 'rest'
import mime from 'rest/interceptor/mime'
import template from 'rest/interceptor/template'
import errorCode from 'rest/interceptor/errorCode'
import basicAuth from 'rest/interceptor/basicAuth'

/**
 * Create API client instance instance by specifed config. All methods then will use config for requests
 * @param  {object} config used for all requests
 * @returns {object} set of functions
 */
export default function(config) {
    const {basicAuth: {username, password}} = config

    const client = rest
        .wrap(mime, {mime: 'application/json'})
        .wrap(template)
        .wrap(errorCode)
        .wrap(basicAuth, {username, password})

    return {
        fetchResource: (collection, params = {}) => {
            return client({
                method: 'GET',
                params,
                path: `/api/${collection.name}{?page,expand,q,per-page}`,
            }).then((result) => {
                return {
                    pagination: {
                        currentPage: parseInt(result.headers['X-Pagination-Current-Page'], 10),
                        pageCount: parseInt(result.headers['X-Pagination-Page-Count'], 10),
                        perPage: parseInt(result.headers['X-Pagination-Per-Page'], 10),
                        totalCount: parseInt(result.headers['X-Pagination-Total-Count'], 10),
                    },
                    data: result.entity,
                }
            })
        },

        patchRecord: (resourceScheme, record) => {
            return client({path: `/api/${resourceScheme.name}/${record.id}`, method: 'PATCH', entity: record})
        },

        postRecord: (resourceScheme, record) => {
            return client({path: `/api/${resourceScheme.name}`, method: 'POST', entity: record})
        },

        deleteRecord: (resourceScheme, record) => {
            return client({path: `/api/${resourceScheme.name}/${record.id}`, method: 'DELETE'})
        },
    }
}

const commonClient = rest
    .wrap(errorCode)
    .wrap(template)

export const login = (username, password) => {
    const client = commonClient
        .wrap(mime, {mime: 'application/x-www-form-urlencoded'})
        .wrap(template)

    return client({path: '/admin/login', entity: {username, password}, method: 'POST'})
        .then((result) => result.entity)
        .catch((result) => {
            throw result.status
        })
}

export const logout = () => {
    const client = commonClient
        .wrap(mime, {mime: 'application/x-www-form-urlencoded'})
        .wrap(template)

    return client({path: '/admin/logout', method: 'POST'})
        .then((result) => result.entity)
        .catch((result) => {
            throw result.status
        })
}

export const user = () => {
    const client = commonClient
        .wrap(mime, {mime: 'application/json'})

    return client({path: '/admin/user', method: 'POST'})
        .then((result) => result.entity)
        .catch((result) => {
            throw result.status
        })
}

