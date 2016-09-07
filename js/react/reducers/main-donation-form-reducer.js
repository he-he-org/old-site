import {ProvideType, CurrencyType, AmountOptionType} from '../../shared/definitions'

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

const getCurrencyOptionAmount = (settings, currency, option, current) => {
    if (option === OPTION_OTHER) {
        return current
    }
    const currencySettings = settings[currency]
    if (!currencySettings) return current
    const optionSettings = currencySettings[option]
    if (!optionSettings) return current
    return optionSettings
}

const reducer = (state = initialState, action) => {
    const {currencySettings} = state
    switch (action.type) {
        case 'SET_PROVIDER': {
            const {provider} = action
            const {amountOption} = state
            const currency = provider === ProvideType.YANDEX_MONEY ? CurrencyType.RUB : state.currency
            const amount = getCurrencyOptionAmount(currencySettings, currency, amountOption, state.amount)

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
                    : getCurrencyOptionAmount(currencySettings, currency, amountOption, state.amount)
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
            const amount = getCurrencyOptionAmount(state.currencySettings, currency, amountOption, state.amount)

            return {...state,
                amountOption,
                amount,
            }
        }
        case 'SET_AMOUNT': {
            const {amount} = action
            const {currency} = state
            let amountOption = null

            if (amount === getCurrencyOptionAmount(currencySettings, currency, OPTION_SUM_1, state.amount)) {
                amountOption = OPTION_SUM_1
            }
            else if (amount === getCurrencyOptionAmount(currencySettings, currency, OPTION_SUM_2, state.amount)) {
                amountOption = OPTION_SUM_2
            }
            else if (amount === getCurrencyOptionAmount(currencySettings, currency, OPTION_SUM_3, state.amount)) {
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
