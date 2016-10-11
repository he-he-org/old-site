require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'

import {createStore} from '~/shared/redux-helpers'
import Root from './root'
import * as action from '~/react/action-creators/volunteers/questionnaire'

export default (settings) => {


    function buildStateTree(data) {
        function buildGroupTree(group) {
            const result = {}
            if (group.subtype === 'scale') {
                const defValue = group.from
                group.items.forEach((item) => {
                    if (item.name) {
                        result[item.name] = defValue
                    }
                })
            }
            else if (group.subtype === 'checkbox') {
                group.items.forEach((item) => {
                    if (item.name) {
                        const subtree = {}
                        group.options.forEach((option) => {
                            subtree[option.name] = false
                        })
                        result[item.name] = subtree
                    }
                })
            }

            return result
        }

        function buildPageTree(page) {
            const result = {}
            page.items.forEach((item) => {
                if (item.name) {
                    if (item.type === 'group') {
                        result[item.name] = buildGroupTree(item)
                    }
                    else {
                        let defValue = null
                        if (item.type === 'text') {
                            defValue = ''
                        }
                        else if (item.type === 'tags') {
                            defValue = ''
                        }
                        else if (item.type === 'textarea') {
                            defValue = ''
                        }
                        else if (item.type === 'checkbox') {
                            defValue = false
                        }
                        else {
                            throw new Error(`Unsupported item type ${item.type}`)
                        }
                        result[item.name] = defValue
                    }
                }
            })
            return result
        }

        const result = {}
        data.pages.forEach((page) => {
            result[page.name] = buildPageTree(page)
        })
        return result
    }

// todo: need to validate json

    const initialState = buildStateTree(settings)
    console.log("initialState", initialState)

    const reducer = (state = initialState, action) => {
        if (action.type === 'SET_VALUE') {
            const {path, value} = action
            if (path.length > 0) {
                const key = path[0]
                if (key in state) {
                    const newValue = path.length === 1
                        ? value
                        : reducer(state[key], {...action, path: path.slice(1)})
                    return {
                        ...state,
                        [key]: newValue,
                    }
                }
            }
        }
        return state
    }

    const store = createStore(reducer, initialState)

    const handleChange = (path, value) => {
        store.dispatch(action.setValue(path, value))
    }

    const render = () => {
        const state = store.getState()
        ReactDOM.render(
            h(Root, {settings, state, onChange: handleChange}),
            document.getElementById('react-volunteers-form')
        )
    }

    document.addEventListener('DOMContentLoaded', () => {
        store.subscribe(render)
        render()
    })
}

