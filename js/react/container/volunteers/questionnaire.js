require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'
import {combineReducers} from 'redux'
import nanoajax from 'nanoajax'
import prefixer from 'bem-prefixer'

import {createStore} from '~/shared/redux-helpers'
import Root from '~/react/presentational/volunteers/questionnaire/root'
import * as action from '~/react/action-creators/volunteers/questionnaire'


export default (settings) => {
    // todo: need to validate json

    const questionnaireInitialState = buildStateTree(settings)

    const questionnaireReducer = (state = questionnaireInitialState, action) => {
        if (action.type === 'SET_VALUE') {
            const {path, value} = action
            if (path.length > 0) {
                const key = path[0]
                if (key in state) {
                    const newValue = path.length === 1
                        ? value
                        : questionnaireReducer(state[key], {...action, path: path.slice(1)})
                    return {
                        ...state,
                        [key]: newValue,
                    }
                }
            }
        }
        return state
    }

    const uiReducer = (state = {state: 'IDLE'}, action) => {
        if (action.type === 'SENDING_START') {
            return {
                ...state,
                state: 'SENDING',
            }
        }
        else if (action.type === 'SENDING_DONE') {
            return {
                ...state,
                state: 'SENDING_DONE',
            }
        }
        else if (action.type === 'SENDING_FAILED') {
            return {
                ...state,
                state: 'SENDING_FAILED',
            }
        }
        return state
    }

    const reducer = combineReducers({
        questionnaire: questionnaireReducer,
        ui: uiReducer,
    })

    const store = createStore(reducer)

    const handleChange = (path, value) => {
        store.dispatch(action.setValue(path, value))
    }


    const send = () => {
        const {questionnaire} = store.getState()
        store.dispatch({type: 'SENDING_START'})
        nanoajax.ajax({
            url: '/api/volunteers/send-questionnaire',
            method: 'POST',
            body: JSON.stringify(questionnaire),
        }, (code, responseText, request) => {
            if (code === 200) {
                store.dispatch({type: 'SENDING_DONE'})
            }
            else {
                store.dispatch({type: 'SENDING_FAILED'})
            }
        })
    }

    const render = () => {

        const bem = prefixer('questionnaire')

        const {questionnaire, ui} = store.getState()
        let el = null
        if (ui.state === 'SENDING_DONE') {
            el = h(bem('div#done'),
                h(bem('h1#done-header'), 'Спасибо!'),
                h(bem('p#done-message'), 'Мы рассмотрим вашу анкету в самое ближайшее время!')
            )
        }
        else {
            el = h('div',
                h('h1', 'Анкета волонтера'),
                h(Root, {settings, state: questionnaire, onChange: handleChange}),
                ui.state === 'SENDING_FAILED' && h('div.message', 'Something has gone wrong shile sending the form :('),
                h(bem('button#submit'), {onClick: send, disabled: ui.state === 'SENDING'}, 'Отправить')
            )
        }
        ReactDOM.render(
            el,
            document.getElementById('react-volunteers-form')
        )
    }

    document.addEventListener('DOMContentLoaded', () => {
        store.subscribe(render)
        render()
    })
}

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


function buildItemValue(item) {
    if (item.type === 'group') {
        if (!item.name) {
            throw new Error('Item doesn`t have name: ' + JSON.stringify(item))
        }
        return buildGroupTree(item)
    }
    else {
        if (!item.name) {
            throw new Error('Item doesn`t have name: ' + JSON.stringify(item))
        }
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
        else if (item.type === 'radio') {
            defValue = item.options[0].value //todo: fix
        }
        else {
            throw new Error(`Unsupported item type ${item.type}`)
        }
        return defValue
    }
}

function buildPageTree(page) {
    const result = {}
    page.items.forEach((item) => {
        if (item.type === 'row') {
            item.content.forEach((child) => {
                if (child.name) {
                    result[child.name] = buildItemValue(child)
                }
            })
        }
        else if (item.name) {
            result[item.name] = buildItemValue(item)
        }
    })
    return result
}

function buildStateTree(data) {

    const result = {}
    data.pages.forEach((page) => {
        result[page.name] = buildPageTree(page)
    })
    return result
}
