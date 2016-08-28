const ProvideType = {
    YANDEX_MONEY: 'YANDEX_MONEY',
    PAYPAL: 'PAYPAL',
}

const MethodType = {
    ACCOUNT: 'ACCOUNT',
    CARD: 'CARD',
}

const CurrencyType = {
    RUR: 'RUR',
    USD: 'USD',
    EUR: 'EUR',
}

const AmountOptionType = {
    OPTION_SUM_1: 'OPTION_SUM_1',
    OPTION_SUM_2: 'OPTION_SUM_2',
    OPTION_SUM_3: 'OPTION_SUM_3',
    OPTION_OTHER: 'OPTION_OTHER',
}

const currencyOptionsToAmount = {
    [CurrencyType.RUR]: {
        [AmountOptionType.OPTION_SUM_1]: 300,
        [AmountOptionType.OPTION_SUM_2]: 500,
        [AmountOptionType.OPTION_SUM_3]: 1000,
    },
    [CurrencyType.USD]: {
        [AmountOptionType.OPTION_SUM_1]: 10,
        [AmountOptionType.OPTION_SUM_2]: 20,
        [AmountOptionType.OPTION_SUM_3]: 50,
    },
    [CurrencyType.EUR]: {
        [AmountOptionType.OPTION_SUM_1]: 10,
        [AmountOptionType.OPTION_SUM_2]: 20,
        [AmountOptionType.OPTION_SUM_3]: 50,
    },
}

export {
    ProvideType,
    MethodType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
}
