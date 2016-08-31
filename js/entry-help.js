require('is-nan').shim()

import {createStore} from 'redux'
import {h} from 'react-markup'
import ReactDOM from 'react-dom'
import {setCurrency, setProvider, setAmountOption, setAmount} from './shared/main-donate-form/action-creators'

import MainDonationForm from './shared/main-donate-form/main-donate-form'
import mainDonationFormReducer from './shared/main-donate-form/reducer'
import DonateInfo from './help/donate/donate-info'
import I18N from './i18n'

import {
    LanguageType,
    ProvideType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
} from './shared/definitions'

import * as packages from './help/packages'

// Donation form and donate info
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

    const defaultProvider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL
    const defaultCurrency = language === LanguageType.RU ? CurrencyType.RUR : CurrencyType.USD
    const initialState = {
        provider: defaultProvider,
        currency: defaultCurrency,
        amountOption: AmountOptionType.OPTION_SUM_2,
        amount: currencyOptionsToAmount[defaultCurrency][AmountOptionType.OPTION_SUM_2],
        targets: i18n.t('strings', 'help/donate/targets'), // Назначение платежа
        formComment: i18n.t('strings', 'help/donate/formcomment'), // Название перевода на странице подтверждения
        shortDesc: i18n.t('strings', 'help/donate/short-dest'), // Название перевода в истории отправителя
    }

    const store = createStore(mainDonationFormReducer, initialState)

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

    packages.run(i18n)
}).catch((e) => {
    console.error(e)
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

