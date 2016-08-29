require('is-nan').shim()

import {createStore} from 'redux'
import {h} from 'react-markup'
import ReactDOM from 'react-dom'
import {setCurrency, setProvider, setAmountOption, setAmount} from './shared/action-creators'
import {detectLanguage} from './shared/utils'

import MainDonationForm from './shared/main-donate-form'
import DonateInfo from './help/donate/donate-info'
import I18N from './i18n'

import {
    LanguageType,
    ProvideType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
} from './shared/definitions'

// Donation form and donate info
document.addEventListener('DOMContentLoaded', () => {
    const language = detectLanguage()

    const defaultProvider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL
    const defaultCurrency = language === LanguageType.RU ? CurrencyType.RUR : CurrencyType.USD
    const initialState = {
        provider: defaultProvider,
        currency: defaultCurrency,
        amountOption: AmountOptionType.OPTION_SUM_2,
        amount: currencyOptionsToAmount[defaultCurrency][AmountOptionType.OPTION_SUM_2],
    }

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'SET_PROVIDER': {
                const {provider} = action
                const {amountOption} = state
                const currency = provider === ProvideType.YANDEX_MONEY ? CurrencyType.RUR : state.currency

                let amount = null
                if (amountOption === AmountOptionType.OPTION_SUM_1) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else if (amountOption === AmountOptionType.OPTION_SUM_2) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else if (amountOption === AmountOptionType.OPTION_SUM_3) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else {
                    amount = state.amount
                }

                return {...state,
                    provider,
                    currency,
                    amount,
                }
            }
            case 'SET_CURRENCY': {
                const {provider} = state
                if (provider === ProvideType.PAYPAL) {
                    const {currency} = action
                    const {amountOption} = state
                    const amount = amountOption === AmountOptionType.OPTION_OTHER
                        ? state.amount
                        : currencyOptionsToAmount[currency][amountOption]
                    return {...state,
                        currency,
                        amount,
                    }
                }
                return state
            }
            case 'SET_AMOUNT_OPTION': {
                const {amountOption} = action
                const {currency} = state
                let amount = null
                if (amountOption === AmountOptionType.OPTION_SUM_1) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else if (amountOption === AmountOptionType.OPTION_SUM_2) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else if (amountOption === AmountOptionType.OPTION_SUM_3) {
                    amount = currencyOptionsToAmount[currency][amountOption]
                }
                else {
                    amount = state.amount
                }

                return {...state,
                    amountOption,
                    amount,
                }
            }
            case 'SET_AMOUNT': {
                return {...state,
                    amount: action.amount,
                }
            }
            default: return state
        }
    }

    const store = createStore(reducer)

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

    const formEl = document.querySelector('#react-main-donation-form')
    const infoEl = document.querySelector('#react-donate-info')

    const i18n = new I18N()

    const render = () => {
        const state = store.getState()
        if (formEl) {
            ReactDOM.render(
                h(MainDonationForm, {
                    i18n,
                    onChangeProvider: changeProvider,
                    onChangeCurrency: changeCurrency,
                    onChangeAmountOption: changeAmountOption,
                    onChangeAmount: changeAmount,
                    ...state,
                }),
                formEl
            )
        }
        if (infoEl) {
            ReactDOM.render(
                h(DonateInfo, {
                    i18n,
                    ...state,
                }),
                infoEl
            )
        }
    }
    store.subscribe(render)
    render()
})

// Left menu bar
const STICKY_MARGIN = 5

document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.slice.apply(document.querySelectorAll('.category-menu')).forEach((menu) => {
        // Highlight current item
        const highlightItems = () => {
            Array.prototype.slice.apply(menu.querySelectorAll('.category-menu_item')).forEach((item) => {
                const url = new URL(item.getAttribute('href'), window.location)
                if (url.href === location.href) {
                    item.classList.add('category-menu_item--active')
                }
                else {
                    item.classList.remove('category-menu_item--active')
                }
            })
        }
        window.addEventListener('hashchange', highlightItems, false)
        highlightItems()

        // Make sticky menu
        const body = menu.querySelector('.category-menu_body')
        const checkSticky = () => {
            const bodyRect = document.body.getBoundingClientRect()
            const menuRect = menu.getBoundingClientRect()
            const pos = menuRect.top - bodyRect.top

            const bodyScroll = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop || 0

            const dif = Math.max(bodyScroll - pos + STICKY_MARGIN, 0)

            body.style.top = `${dif}px`
        }
        document.addEventListener('scroll', checkSticky)
        checkSticky()
    })
})

