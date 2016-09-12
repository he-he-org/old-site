import {ProvideType, CurrencyType, AmountOptionType} from '~/shared/definitions'

const {
    OPTION_SUM_1,
    OPTION_SUM_2,
    OPTION_SUM_3,
    OPTION_OTHER,
    } = AmountOptionType


export const initialState = {
    provider: ProvideType.YANDEX_MONEY,
    currency: CurrencyType.RUB,
    amountOption: OPTION_SUM_2,
    amount: 0,
    targets: '', // Назначение платежа
    formComment: '', // Название перевода на странице подтверждения
    shortDesc: '', // Название перевода в истории отправителя
    currencySettings: {},
}

const getCurrencyOptionAmount = (state, currency, option) => {
    if (option === OPTION_OTHER) {
        return state.amount
    }
    const currencySettings = state.currencySettings[currency]
    if (!currencySettings) {
        return state.amount
    }
    const optionSettings = currencySettings[option]
    if (!optionSettings) {
        return state.amount
    }
    return optionSettings
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROVIDER': {
            const {provider} = action
            const {amountOption} = state
            const currency = provider === ProvideType.YANDEX_MONEY ? CurrencyType.RUB : state.currency
            const amount = getCurrencyOptionAmount(state, state.currency, amountOption)

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
                const amount = amountOption === OPTION_OTHER
                    ? state.amount
                    : getCurrencyOptionAmount(state, currency, amountOption)
                return {...state,
                    currency,
                    amount,
                }
            }
            return state
        }
        case 'SET_AMOUNT_OPTION': {
            const {amountOption} = action
            const amount = getCurrencyOptionAmount(state, state.currency, amountOption)
            return {...state,
                amountOption,
                amount,
            }
        }
        case 'SET_AMOUNT': {
            const {amount} = action
            let amountOption = null

            if (amount === getCurrencyOptionAmount(state, state.currency, OPTION_SUM_1)) {
                amountOption = OPTION_SUM_1
            }
            else if (amount === getCurrencyOptionAmount(state, state.currency, OPTION_SUM_2)) {
                amountOption = OPTION_SUM_2
            }
            else if (amount === getCurrencyOptionAmount(state, state.currency, OPTION_SUM_3)) {
                amountOption = OPTION_SUM_3
            }
            else {
                amountOption = OPTION_OTHER
            }

            return {...state,
                amountOption,
                amount,
            }
        }

        case 'SET_TARGETS': {
            const {targets} = action
            return {...state,
                targets,
            }
        }
        case 'SET_FORM_COMMENT': {
            const {formComment} = action
            return {...state,
                formComment,
            }
        }
        case 'SET_SHORT_DESC': {
            const {shortdesc} = action
            return {...state,
                shortdesc,
            }
        }

        default: return state
    }
}

export default reducer
