require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'
import {createStore, combineReducers} from 'redux'
import {bindEvents} from './redux-dom-binding'
import {merge} from 'functional-utils'

import I18N from './i18n'
import MainDonationForm from './shared/main-donate-form/main-donate-form'
import mainDonationFormReducer from './shared/main-donate-form/reducer'
import DonateModal from './shared/donate-modal'
import {
    LanguageType,
    ProvideType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
} from './shared/definitions'
import {setCurrency, setProvider, setAmountOption, setAmount} from './shared/main-donate-form/action-creators'
import {getCurrencySign} from './shared/utils'

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
        ],
        'texts': [],
    })
}).then((i18n) => {

    const language = i18n.detectLanguage()
    const currency = language === LanguageType.RU ? CurrencyType.RUR : CurrencyType.USD
    const provider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL

    const smallFormReducerInitialState = {
        value: currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_3],
        focused: false,
    }

    const smallFormReducer = (state = smallFormReducerInitialState, action) => {
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


    const modalInitialState = {
        displayed: false,
    }
    const modalReducer = (state = modalInitialState, action) => {
        switch (action.type) {
            case 'SET_MODAL_DISPLAYED': {
                return {
                    ...state,
                    displayed: action.displayed,
                }
            }
            default: return state
        }
    }


    /*
        Common donation logic
     */
    Array.prototype.slice.apply(document.querySelectorAll('.widget-main-donate-form')).forEach((formDiv) => {

        const mainDonateFormInitialState = {
            provider,
            currency,
            amountOption: AmountOptionType.OPTION_SUM_2,
            amount: currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_2],
            targets: i18n.t('strings', 'help/donate/targets'), // Назначение платежа
            formComment: i18n.t('strings', 'help/donate/formcomment'), // Название перевода на странице подтверждения
            shortDesc: i18n.t('strings', 'help/donate/short-dest'), // Название перевода в истории отправителя
        }

        const form = formDiv.querySelector('.widget-main-donate-form_form')

        const tips = formDiv.querySelector('.widget-main-donate-form_tips')
        const input = formDiv.querySelector('.widget-main-donate-form_amount')
        const button = formDiv.querySelector('.widget-main-donate-form_donate-button')

        const sumInput = form.querySelector('input[name=sum]')

        // Get tips template
        const tipsTempalte = tips.innerText

        // Configure rendering
        const combinedReducers = combineReducers({
            smallForm: smallFormReducer,
            mainDonationForm: mainDonationFormReducer,
            modal: modalReducer,
        })

        const store = createStore(combinedReducers, {
            smallForm: smallFormReducerInitialState,
            mainDonationForm: mainDonateFormInitialState,
            modal: modalInitialState,
        })

        const closeModal = () => {
            store.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: false,
            })
        }

        const changeProvider = (provider) => {
            store.dispatch(setProvider(provider))
        }

        const changeCurrency = (currency) => {
            store.dispatch(setCurrency(currency))
        }

        const changeAmountOption = (amountOption) => {
            store.dispatch(setAmountOption(amountOption))
        }

        const changeAmount = (amount) => {
            store.dispatch(setAmount(amount))
        }

        const render = () => {
            const {smallForm} = store.getState()
            const {value, focused} = smallForm

            // Calculate derived values
            const a = 0.005 // coefficient for PC payment type
            const amountDue = value - value * (a / (1 + a))
            const fee = value - amountDue

            // Update view
            if (!focused) {
                if (currency === CurrencyType.RUR) {
                    input.value = value + '\u00a0' + getCurrencySign(currency)
                }
                else {
                    input.value = getCurrencySign(currency) + value
                }
            }
            else {
                input.value = value
            }

            button.disabled = !(value > 0)
            if (currency === CurrencyType.RUR) {
                tips.innerText = tipsTempalte
                    .replace('{amount}', amountDue.toFixed(2))
                    .replace('{fee}', fee.toFixed(2))
                tips.classList.remove('hidden')
            }
            sumInput.value = value

            const {modal, mainDonationForm} = store.getState()
            ReactDOM.render(
                h(DonateModal, {
                    ...modal,
                    onClose: closeModal,
                },
                    h(MainDonationForm, {
                        i18n,
                        onChangeProvider: changeProvider,
                        onChangeCurrency: changeCurrency,
                        onChangeAmountOption: changeAmountOption,
                        onChangeAmount: changeAmount,
                        ...mainDonationForm,
                    })
                ),
                document.querySelector('#react-tmp-popup-place')
            )
        }
        store.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], store)


        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const {smallForm} = store.getState()
            const {value} = smallForm
            store.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
            store.dispatch(setProvider(provider))
            store.dispatch(setCurrency(currency))
            store.dispatch(setAmount(value))
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
        const store = createStore(smallFormReducer)
        const render = () => {
            const {value, focused} = store.getState()

            // Update view
            input.value = value + (!focused ? ' ₽' : '')
            button.disabled = !(value > 0)
            sumInput.value = value
        }
        store.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], store)
    })

    /*
       Shuffle team members
     */
    const teamRow = document.querySelector('.team-row')
    const members = teamRow.querySelectorAll('.team-member')
    for (let i = 0; i < members.length; ++i) {
        teamRow.appendChild(members[Math.floor(Math.random() * members.length)])
    }
}).catch((e) => {
    console.error(e)
})
