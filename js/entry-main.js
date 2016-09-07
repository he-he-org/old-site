require('is-nan').shim()
import Promise from 'promise-polyfill'

import {createStore} from 'redux'
import ReactDOM from 'react-dom'
import {bindEvents} from './redux-dom-binding'
import {merge} from 'functional-utils'
import {Provider, connect} from 'react-redux'
import {h} from 'react-markup'

import I18N from './i18n'
import {
    LanguageType,
    ProvideType,
    CurrencyType,
} from './shared/definitions'
import {
    setCurrency,
    setProvider,
    setAmountOption,
    setAmount,
    setTargets,
    setFormComment,
    setShortDesc,
} from './react/action-creators/main-donation-form'

import {
    reducer as donateModalReducer,
    initialState as donateModalInitialState,
} from './react/reducers/donate-modal-reducer'


import Popup from './react/container/donate-popup/donate-popup'

/*
 Shuffle team members
 */
document.addEventListener('DOMContentLoaded', () => {
    const teamRow = document.querySelector('.team-row')
    const members = teamRow.querySelectorAll('.team-member')
    for (let i = 0; i < members.length; ++i) {
        teamRow.appendChild(members[Math.floor(Math.random() * members.length)])
    }
})

new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve)
}).then(() => {
    return I18N.create({
        'strings': [
            'help/donate/donate-button-title',
            'help/donate/provider-options/ym',
            'help/donate/amount-options/other-amount',
            'help/main-donation-form/money-template',
            'help/donate/info/for-us/title',
            'help/donate/info/for-them/title',
            'help/donate/info/300/for-us/options/1',
            'help/donate/info/300/for-us/options/2',
            'help/donate/info/300/for-us/options/3',
            'help/donate/info/300/for-them/options/1',
            'help/donate/info/500/for-us/options/1',
            'help/donate/info/500/for-us/options/2',
            'help/donate/info/500/for-us/options/3',
            'help/donate/info/500/for-them/options/1',
            'help/donate/info/1000/for-us/options/1',
            'help/donate/info/1000/for-us/options/2',
            'help/donate/info/1000/for-them/options/1',
            'help/donate/info/1000/for-them/options/2',
            'help/donate/info/1000/for-them/options/3',
            'help/donate/formcomment',
            'help/donate/short-dest',
            'help/donate/targets',
            'widgets/shared/main-donate-form/targets',
            'widgets/shared/main-donate-form/formcomment',
            'widgets/shared/main-donate-form/short-dest',
        ],
        'texts': [],
    })
}).then((i18n) => {
    const language = i18n.detectLanguage()

    const currency = CurrencyType[i18n.settings.language[language].defaultCurrency]
    const provider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL

    // Init store for popup
    const popupStore = createStore(donateModalReducer, donateModalInitialState)
    ReactDOM.render(
        h(Provider, {store: popupStore},
            h(Popup(i18n))
        ),
        document.querySelector('#react-popup-entry')
    )

    const localInitialState = {
        value: i18n.settings.currency[currency].donationOption3,
        focused: false,
    }

    const localReducer = (state = localInitialState, action) => {
        switch (action.type) {
            case 'DOM_FOCUS': {
                return merge(state, {focused: true})
            }
            case 'DOM_BLUR': {
                return merge(state, {focused: false})
            }
            case 'DOM_INPUT': {
                const number = Number(action.text)
                if (Number.isNaN(number)) {
                    return state
                }
                else {
                    return merge(state, {value: number})
                }
            }
            default: return state
        }
    }

    /*
        Common donation logic
     */
    Array.prototype.slice.apply(document.querySelectorAll('.widget-main-donate-form')).forEach((formDiv) => {
        const form = formDiv.querySelector('.widget-main-donate-form_form')

        const tips = formDiv.querySelector('.widget-main-donate-form_tips')
        const input = formDiv.querySelector('.widget-main-donate-form_amount')
        const button = formDiv.querySelector('.widget-main-donate-form_donate-button')

        const sumInput = form.querySelector('input[name=sum]')

        // Get tips template
        const tipsTempalte = tips.innerText

        // Configure rendering
        const localStore = createStore(localReducer)


        const render = () => {
            const {value, focused} = localStore.getState()

            // Calculate derived values
            const a = 0.005 // coefficient for PC payment type
            const amountDue = value - value * (a / (1 + a))
            const fee = value - amountDue

            // Update view
            //todo: implement formatMoney
            if (!focused) {
                if (currency === CurrencyType.RUB) {
                    input.value = value + '\u00a0' + i18n.settings.currency[currency].symbol
                }
                else {
                    input.value = i18n.settings.currency[currency].symbol + value
                }
            }
            else {
                input.value = value
            }

            button.disabled = !(value > 0)
            if (currency === CurrencyType.RUB) {
                tips.innerText = tipsTempalte
                    .replace('{amount}', amountDue.toFixed(2))
                    .replace('{fee}', fee.toFixed(2))
                tips.classList.remove('hidden')
            }
            sumInput.value = value
        }
        localStore.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], localStore)


        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const {value} = localStore.getState()
            popupStore.dispatch(setProvider(provider))
            popupStore.dispatch(setCurrency(currency))
            popupStore.dispatch(setAmount(value))

            popupStore.dispatch(setTargets(i18n.t('strings', 'widgets/shared/main-donate-form/targets')))
            popupStore.dispatch(setFormComment(i18n.t('strings', 'widgets/shared/main-donate-form/formcomment')))
            popupStore.dispatch(setShortDesc(i18n.t('strings', 'widgets/shared/main-donate-form/short-dest')))
            popupStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })

    /*
     Special projects logic
     */
    Array.prototype.slice.apply(document.querySelectorAll('.special-project_donate')).forEach((form) => {
        const input = form.querySelector('.special-project_donate-amount')
        const button = form.querySelector('.special-project_donate-button')

        const sumInput = form.querySelector('input[name=sum]')

        // Configure rendering
        const localStore = createStore(localReducer)
        const render = () => {
            const {value, focused} = localStore.getState()

            // Update view
            if (!focused) {
                if (currency === CurrencyType.RUB) {
                    input.value = value + '\u00a0' + i18n.settings.currency[currency].symbol
                }
                else {
                    input.value = i18n.settings.currency[currency].symbol + value
                }
            }
            else {
                input.value = value
            }
            button.disabled = !(value > 0)
            sumInput.value = value
        }
        localStore.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], localStore)


        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const {value} = localStore.getState()
            popupStore.dispatch(setProvider(provider))
            popupStore.dispatch(setCurrency(currency))
            popupStore.dispatch(setAmount(value))
            popupStore.dispatch(setTargets(form.querySelector('input[name=formcomment]').value))
            popupStore.dispatch(setFormComment(form.querySelector('input[name=short-dest]').value))
            popupStore.dispatch(setShortDesc(form.querySelector('input[name=targets]').value))
            popupStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })
}).catch((e) => {
    console.error(e)
})
