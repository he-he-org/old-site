const LanguageType = {
    EN: 'en-US',
    RU: 'ru-RU',
    ES: 'es-ES',
}

const ProvideType = {
    YANDEX_MONEY: 'YANDEX_MONEY',
    PAYPAL: 'PAYPAL',
}

const MethodType = {
    ACCOUNT: 'ACCOUNT',
    CARD: 'CARD',
}

const CurrencyType = {
    RUB: 'RUB',
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
    [CurrencyType.RUB]: {
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
    LanguageType,
    ProvideType,
    MethodType,
    CurrencyType,
    AmountOptionType,
    currencyOptionsToAmount,
}
