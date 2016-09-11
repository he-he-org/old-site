import * as redux from 'redux'

import createLogger from 'redux-logger'
const logger = createLogger()

export const createStore = (...args) => {
    if (process.env.NODE_ENV === 'development') {
        return redux.createStore(
            ...args,
            redux.applyMiddleware(logger)
        )
    }
    else {
        return redux.createStore(...args)
    }
}
