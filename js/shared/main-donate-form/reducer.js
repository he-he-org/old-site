import {ProvideType, CurrencyType, AmountOptionType, currencyOptionsToAmount} from '../definitions'


const initialState = {
    provider: ProvideType.YANDEX_MONEY,
    currency: CurrencyType.RUR,
    amountOption: AmountOptionType.OPTION_SUM_2,
    amount: currencyOptionsToAmount[CurrencyType.RUR][AmountOptionType.OPTION_SUM_2],
    targets: '', // Назначение платежа
    formComment: '', // Название перевода на странице подтверждения
    shortDesc: '', // Название перевода в истории отправителя
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
            const {amount} = action
            const {currency} = state
            let amountOption = null
            if (amount === currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_1]) {
                amountOption = AmountOptionType.OPTION_SUM_1
            }
            else if (amount === currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_2]) {
                amountOption = AmountOptionType.OPTION_SUM_2
            }
            else if (amount === currencyOptionsToAmount[currency][AmountOptionType.OPTION_SUM_3]) {
                amountOption = AmountOptionType.OPTION_SUM_3
            }
            else {
                amountOption = AmountOptionType.OPTION_OTHER
            }

            return {...state,
                amountOption,
                amount,
            }
        }
        default: return state
    }
}

export default reducer
