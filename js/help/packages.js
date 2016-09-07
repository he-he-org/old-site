require('is-nan').shim()

import {
    LanguageType,
    ProvideType,
    CurrencyType,
} from '../shared/definitions'
import {
    setCurrency,
    setProvider,
    setAmountOption,
    setAmount,
    setTargets,
    setFormComment,
    setShortDesc,
} from '../react/action-creators/main-donation-form'
import Popup from '../react/container/donate-popup/donate-popup'

export const run = (i18n) => {
    const language = i18n.detectLanguage()
    const currency = CurrencyType[i18n.settings.language[language].defaultCurrency]
    const provider = language === LanguageType.RU ? ProvideType.YANDEX_MONEY : ProvideType.PAYPAL

    const popupStore = Popup(i18n)
    /*
        Packages logic
     */
    Array.prototype.slice.apply(document.querySelectorAll('.packages .package')).forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            popupStore.dispatch(setAmount(provider))
            popupStore.dispatch(setProvider(provider))
            popupStore.dispatch(setCurrency(currency))
            popupStore.dispatch(setAmount(parseInt(form.querySelector('input[name=sum]').value, 10)))

            popupStore.dispatch(setTargets(form.querySelector('input[name=formcomment]').value))
            popupStore.dispatch(setFormComment(form.querySelector('input[name=short-dest]').value))
            popupStore.dispatch(setShortDesc(form.querySelector('input[name=targets]').value))
            popupStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })
}
