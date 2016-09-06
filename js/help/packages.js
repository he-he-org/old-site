require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'
import {createStore, combineReducers} from 'redux'

import MainDonationForm from '../shared/main-donate-form/main-donate-form'
import mainDonationFormReducer from '../shared/main-donate-form/reducer'
import DonateModal from '../shared/donate-modal'
import {
    LanguageType,
    ProvideType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
} from '../shared/definitions'
import {
    setCurrency,
    setProvider,
    setAmountOption,
    setAmount,
    setTargets,
    setFormComment,
    setShortDesc,
} from '../shared/main-donate-form/action-creators'

export const run = (i18n) => {
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

    /*
        Packages logic
     */
    Array.prototype.slice.apply(document.querySelectorAll('.packages .package')).forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            modalStore.dispatch(setAmount(provider))
            modalStore.dispatch(setProvider(provider))
            modalStore.dispatch(setCurrency(currency))
            modalStore.dispatch(setAmount(parseInt(form.querySelector('input[name=sum]').value, 10)))

            modalStore.dispatch(setTargets(form.querySelector('input[name=formcomment]').value))
            modalStore.dispatch(setFormComment(form.querySelector('input[name=short-dest]').value))
            modalStore.dispatch(setShortDesc(form.querySelector('input[name=targets]').value))
            modalStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })
}
