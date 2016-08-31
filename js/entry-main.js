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
import {
    setCurrency,
    setProvider,
    setAmountOption,
    setAmount,
    setTargets,
    setFormComment,
    setShortDesc,
} from './shared/main-donate-form/action-creators'
import {getCurrencySign} from './shared/utils'

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
    const currency = language === LanguageType.RU ? CurrencyType.RUR : CurrencyType.USD
    const provider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL


    const mainDonateFormInitialState = {
        provider,
        currency,
        amountOption: AmountOptionType.OPTION_SUM_2,
        amount: currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_2],
        targets: i18n.t('strings', 'help/donate/targets'), // Назначение платежа
        formComment: i18n.t('strings', 'help/donate/formcomment'), // Название перевода на странице подтверждения
        shortDesc: i18n.t('strings', 'help/donate/short-dest'), // Название перевода в истории отправителя
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

    const modalStore = createStore(combineReducers({
        mainDonationForm: mainDonationFormReducer,
        modal: modalReducer,
    }), {
        mainDonationForm: mainDonateFormInitialState,
        modal: modalInitialState,
    })

    const modalRender = () => {
        const closeModal = () => {
            modalStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: false,
            })
        }

        const changeProvider = (provider) => { modalStore.dispatch(setProvider(provider)) }
        const changeCurrency = (currency) => { modalStore.dispatch(setCurrency(currency)) }
        const changeAmountOption = (amountOption) => { modalStore.dispatch(setAmountOption(amountOption)) }
        const changeAmount = (amount) => { modalStore.dispatch(setAmount(amount)) }

        const {modal, mainDonationForm} = modalStore.getState()
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
            document.querySelector('#react-popup-entry')
        )
    }
    modalStore.subscribe(modalRender)
    modalRender()

    const localInitialState = {
        value: currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_3],
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
        }
        localStore.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], localStore)


        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const {value} = localStore.getState()
            modalStore.dispatch(setProvider(provider))
            modalStore.dispatch(setCurrency(currency))
            modalStore.dispatch(setAmount(value))

            modalStore.dispatch(setTargets(i18n.t('strings', 'widgets/shared/main-donate-form/targets')))
            modalStore.dispatch(setFormComment(i18n.t('strings', 'widgets/shared/main-donate-form/formcomment')))
            modalStore.dispatch(setShortDesc(i18n.t('strings', 'widgets/shared/main-donate-form/short-dest')))
            modalStore.dispatch({
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
            sumInput.value = value
        }
        localStore.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ['input', 'focus', 'blur'], localStore)


        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const {value} = localStore.getState()
            modalStore.dispatch(setProvider(provider))
            modalStore.dispatch(setCurrency(currency))
            modalStore.dispatch(setAmount(value))
            modalStore.dispatch(setTargets(form.querySelector('input[name=formcomment]').value))
            modalStore.dispatch(setFormComment(form.querySelector('input[name=short-dest]').value))
            modalStore.dispatch(setShortDesc(form.querySelector('input[name=targets]').value))
            modalStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })
}).catch((e) => {
    console.error(e)
})
