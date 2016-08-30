import {CurrencyType} from './definitions'
const {RUR, USD, EUR} = CurrencyType

export const getCurrencySign = (currency) => {
    if (currency === RUR) return '₽'
    else if (currency === USD) return '$'
    else if (currency === EUR) return '€'
    else throw new Error(`Currency isn't supported: ${currency}`)
}
