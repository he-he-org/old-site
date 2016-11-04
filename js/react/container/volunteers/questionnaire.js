require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'
import {combineReducers} from 'redux'
import nanoajax from 'nanoajax'
import prefixer from 'bem-prefixer'

import {createStore} from '~/shared/redux-helpers'
import Root from '~/react/presentational/volunteers/questionnaire/root'
import * as action from '~/react/action-creators/volunteers/questionnaire'

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


const TEXT_DEF_VALUE = ''
const DATE_DEF_VALUE = ''
const TAGS_DEF_VALUE = ''
const TEXTAREA_DEF_VALUE = ''
const CHECKBOX_DEF_VALUE = false

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
            defValue = TEXT_DEF_VALUE
        }
        else if (item.type === 'date') {
            defValue = DATE_DEF_VALUE
        }
        else if (item.type === 'tags') {
            defValue = TAGS_DEF_VALUE
        }
        else if (item.type === 'textarea') {
            defValue = TEXTAREA_DEF_VALUE
        }
        else if (item.type === 'checkbox') {
            defValue = CHECKBOX_DEF_VALUE
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


function checkMandatoryItem(item, data) {
    if (item.mandatory) {
        if (item.type === 'text') {
            return data !== TEXT_DEF_VALUE
        }
        else if (item.type === 'date') {
            return data !== DATE_DEF_VALUE
        }
        else if (item.type === 'tags') {
            return data !== TAGS_DEF_VALUE
        }
        else if (item.type === 'textarea') {
            return data !== TEXTAREA_DEF_VALUE
        }
        else if (item.type === 'checkbox') {
            return data !== CHECKBOX_DEF_VALUE
        }
        else if (item.type === 'radio') {
            return data !== item.options[0].value //todo: fix
        }
        else {
            throw new Error(`Unsupported item type ${item.type}`)
        }
    }
    return true
}

function checkMandatoryPage(page, data) {
    return page.items
        .filter((item) => item.type !== 'h1' && item.type !== 'p')
        .every((item) => {
            if (item.type === 'row') {
                return item.content
                    .filter((item) => item.type !== 'h1' && item.type !== 'p')
                    .every((item) => checkMandatoryItem(item, data[item.name]))
            }
            else {
                return checkMandatoryItem(item, data[item.name])
            }
        })
}

function checkMandatory(settings, data) {
    return settings.pages
        .filter((page) => typeof page.name !== 'undefined')
        .every((page) => checkMandatoryPage(page, data[page.name]))
}


export default (settings, container, i18n) => {
    // todo: need to validate json
    const questionnaireInitialState = Object.assign({}, buildStateTree(settings), {
        language: i18n.detectLanguage(),
    })

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

    const uiReducer = (state = {state: 'SENDING_FAILED'}, action) => {
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
            body: JSON.stringify({
                version: settings.version,
                answers: questionnaire,
            }),
        }, (code, responseText, request) => {
            const OK_CODE = 200
            if (code === OK_CODE) {
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
        let rootEl = null
        if (ui.state === 'SENDING_DONE') {
            rootEl = h(bem('div#done'),
                h(bem('p#done-message'), {
                    dangerouslySetInnerHTML: {__html: i18n.t('texts', 'volunteers/questionnaire/done-message')},
                })
            )
        }
        else {
            const uiDisabled = ui.state === 'SENDING'
            const mandatoryFilled = checkMandatory(settings, questionnaire)
            const submitDisabled = uiDisabled || !mandatoryFilled
            rootEl = h('div.questionnaire-react-root',
                h(Root, {settings, state: questionnaire, onChange: handleChange}),
                ui.state === 'SENDING_FAILED' && h('div.message',
                    {style: {margin: '1rem', color: 'red'}},
                    'Something has gone wrong while sending the form. Sorry :('
                ),
                h(bem('button#submit'), {
                    onClick: send,
                    disabled: submitDisabled,
                }, i18n.t('strings', 'volunteers/quetaionnaire/submit-button/title'))
            )
        }
        ReactDOM.render(
            rootEl,
            container
        )
    }

    store.subscribe(render)
    render()
}
