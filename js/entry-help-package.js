require('is-nan').shim()
import Promise from 'promise-polyfill'

import {h} from 'react-markup'
import ReactDOM from 'react-dom'

import {createStore} from '~/shared/redux-helpers'
import I18N from './i18n'
import {Provider} from 'react-redux'
import {
    reducer as donateModalReducer,
    initialState as donateModalInitialState,
} from './react/reducers/donate-modal-reducer'
import Popup from '~/react/container/donate-popup'
import {
    setCurrency,
    setProvider,
    setAmount,
    setTargets,
    setFormComment,
    setShortDesc,
} from '~/react/action-creators/main-donation-form'
import {
    setModalDisplayed,
} from '~/react/action-creators/modal'

import {
    LanguageType,
    ProvideType,
    CurrencyType,
} from './shared/definitions'

/*
 Donation form and donate info
  */
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
    const defaultCurrency = CurrencyType[i18n.settings.language[language].defaultCurrency]

    // Init store for popup
    const popupInitialState = {
        modal: donateModalInitialState.modal,
        form: {
            ...donateModalInitialState.form,
            currencySettings: i18n.settings.currency,
        },
    }
    const popupStore = createStore(donateModalReducer, popupInitialState)
    ReactDOM.render(
        h(Provider, {store: popupStore},
            h(Popup(i18n))
        ),
        document.querySelector('#react-donate-popup-entry')
    )

    Array.prototype.slice.apply(document.querySelectorAll('.packages .package')).forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            popupStore.dispatch(setProvider(defaultProvider))
            popupStore.dispatch(setCurrency(defaultCurrency))
            popupStore.dispatch(setAmount(parseInt(form.querySelector('input[name=sum]').value, 10)))
            popupStore.dispatch(setTargets(form.querySelector('input[name=formcomment]').value))
            popupStore.dispatch(setFormComment(form.querySelector('input[name=short-dest]').value))
            popupStore.dispatch(setShortDesc(form.querySelector('input[name=targets]').value))
            popupStore.dispatch(setModalDisplayed(true))
        })
    })
}).catch((e) => {
    console.error(e.stack)
})

/*
 Left menu bar
  */
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

