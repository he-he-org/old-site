import {Component} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'


import {ProviderType, CurrencyType, AmountOptionType, LanguageType} from '~/shared/definitions'
const {YANDEX_MONEY, PAYPAL, SBERBANK} = ProviderType
const {RUB, USD, EUR} = CurrencyType
const {OPTION_SUM_1, OPTION_SUM_2, OPTION_SUM_3, OPTION_OTHER} = AmountOptionType
const YM_URL = 'https://money.yandex.ru/quickpay/confirm.xml'
const YM_RECEIVER = '410012180500847' //todo: move to config
const YM_QUICKPAY_FORM = 'donate' // Тип транзакции
const YM_PAYMENT_TYPE = 'PC' // Способ оплаты

const PP_URL = '/paypal'

const bem = prefixer('main-donate-form')

export default class extends Component {
    formatMoney = (amount, currency) => {
        const {i18n} = this.props
        return i18n.t('strings', 'help/main-donation-form/money-template')
            .replace(/\{amount\}/g, amount)
            .replace(/\{currency\}/g, i18n.settings.currency[currency].symbol)
    }

    handleChangeAmount = (e) => {
        const {value} = e.target
        if (/^[0-9]*$/.test(value)) {
            this.props.onChangeAmount(Number(value))
        }
    }

    renderProviderOptions = () => {
        const {
            i18n,
            provider,
            onChangeProvider,
            } = this.props
        const isRussian = i18n.detectLanguage() === LanguageType.RU
        return h(bem('div#options'),
            h(bem('div', 'option', provider === YANDEX_MONEY ? ['active'] : []),
                {onClick: onChangeProvider.bind(null, ProviderType.YANDEX_MONEY)},
                i18n.t('strings', 'help/donate/provider-options/ym')
            ),
            h(bem('div', 'option', provider === PAYPAL ? ['active'] : []),
                {onClick: onChangeProvider.bind(null, ProviderType.PAYPAL)},
                'PayPal'
            ),
            isRussian && h(bem('div', 'option', provider === SBERBANK ? ['active'] : []),
                {onClick: onChangeProvider.bind(null, ProviderType.SBERBANK)},
                'Сбербанк' //todo: translate
            )
        )
    }

    renderCurrencyOptions = () => {
        const {
            i18n,
            currency,
            provider,
            onChangeCurrency,
            } = this.props

        if (provider === PAYPAL) {
            return h(bem('div#options'),
                h(bem('div', 'option', currency === RUB ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, RUB)},
                    i18n.settings.currency[RUB].symbol
                ),
                h(bem('div', 'option', currency === USD ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, USD)},
                    i18n.settings.currency[USD].symbol
                ),
                h(bem('div', 'option', currency === EUR ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, EUR)},
                    i18n.settings.currency[EUR].symbol
                )
            )
        }
        return null
    }

    renderAmountOptions = () => {
        const {
            i18n,
            currency,
            provider,
            amountOption,
            onChangeAmountOption,
            } = this.props

        if (provider !== SBERBANK) {
            return h(bem('div#options'),
                h(bem('div', 'option', amountOption === OPTION_SUM_1 ? ['active'] : []),
                    {onClick: onChangeAmountOption.bind(null, OPTION_SUM_1)},
                    i18n.settings.currency[currency].donationOption1),
                h(bem('div', 'option', amountOption === OPTION_SUM_2 ? ['active'] : []),
                    {onClick: onChangeAmountOption.bind(null, OPTION_SUM_2)},
                    i18n.settings.currency[currency].donationOption2),
                h(bem('div', 'option', amountOption === OPTION_SUM_3 ? ['active'] : []),
                    {onClick: onChangeAmountOption.bind(null, OPTION_SUM_3)},
                    i18n.settings.currency[currency].donationOption3),
                h(bem('div', 'option', amountOption === OPTION_OTHER ? ['active'] : []),
                    {onClick: onChangeAmountOption.bind(null, OPTION_OTHER)},
                    i18n.t('strings', 'help/donate/amount-options/other-amount'))
            )
        }
        return null
    }

    renderAmount = () => {
        const {
            i18n,
            amount,
            amountOption,
            provider,
            currency,
            } = this.props

        if (provider !== SBERBANK) {
            if (amountOption === AmountOptionType.OPTION_OTHER) {
                const template = i18n.t('strings', 'help/main-donation-form/money-template').replace(/ /g, '\u00a0')
                const parts = template.split('{amount}')
                const renderingParts = []
                parts.forEach((part, i) => {
                    if (i !== 0) {
                        renderingParts.push(h('input', {value: amount, size: 4, onChange: this.handleChangeAmount}))
                    }
                    renderingParts.push(part.replace('{currency}', i18n.settings.currency[currency].symbol))
                })

                return h(bem('div#amount-info'),
                    h(bem('div#amount-input'),
                        ...renderingParts
                    )
                )
            }
            else {
                return h(bem('div#amount-info'),
                    h(bem('div#amount'), this.formatMoney(amount, currency))
                )
            }
        }
        return null
    }


    renderYandexForm = () => {
        const {
            i18n,
            amount,
            targets,
            formComment,
            shortDesc,
            } = this.props

        return h(bem('form#form'), {action: YM_URL},
            h('input', {type: 'hidden', name: 'sum', value: amount}),
            h('input', {type: 'hidden', name: 'receiver', value: YM_RECEIVER}),
            h('input', {type: 'hidden', name: 'formcomment', value: formComment}),
            h('input', {type: 'hidden', name: 'short-dest', value: shortDesc}),
            h('input', {type: 'hidden', name: 'quickpay-form', value: YM_QUICKPAY_FORM}),
            h('input', {type: 'hidden', name: 'targets', value: targets}),
            h('input', {type: 'hidden', name: 'paymentType', value: YM_PAYMENT_TYPE}),
            h(bem('button#submit'),
                i18n.t('strings', 'help/donate/donate-button-title')
            )
        )
    }

    renderPaypalForm = () => {
        const {
            i18n,
            amount,
            currency,
            } = this.props

        let paypalCurrency = currency
        if (currency === RUB) {
            paypalCurrency = 'RUB'
        }
        else if (currency === USD) {
            paypalCurrency = 'USD'
        }
        else if (currency === EUR) {
            paypalCurrency = 'EUR'
        }
        else {
            throw new Error(`Currency isn't supported: ${currency}`)
        }

        return h(bem('form#form'), {action: PP_URL},
            h('input', {type: 'hidden', name: 'amount', value: amount}),
            h('input', {type: 'hidden', name: 'currency', value: paypalCurrency}),
            h(bem('button#submit'),
                i18n.t('strings', 'help/donate/donate-button-title')
            )
        )
    }

    renderSberbankForm = () => {
        return h(bem('form#form'))
    }

    renderInfo = () => {
        const {provider} = this.props

        if (provider === SBERBANK) {
            //todo: translate
            return h(bem('div#info'),
                h(bem('div#info-p'),
                    h('span', 'Вы можете сделать пожертвование на счет в Сбербанке. Проще всего это сделать по '),
                    h('b', 'номеру карты:')

                ),
                h(bem('div#info-details.card'),
                    '4276 0600 1625 7654'
                ),
                h(bem('div#info-p'),
                    h('a', {href: 'http://tropical-doc.livejournal.com/profile'}, 'Реквизиты для банковского перевода')
                )

                //h(bem('div#info-p'),
                //    'Кроме того, можно сделать банковский перевод. Реквизиты для рублевых переводов:'
                //),
                //h(bem('div#info-details'),
                //    //h('div', 'Получатель: ВАЛИКОВА ВИКТОРИЯ НИКОЛАЕВНА'),
                //    //h('div', 'Счет получателя: 40817810006002449548'),
                //    //h('div', 'Банк получателя: ОТДЕЛЕНИЕ N8598 СБЕРБАНКА РОССИИ г. УФА'),
                //    //h('div', 'БИК банка получателя: 048073601'),
                //    //h('div', 'Корреспонденский счет: 30101810300000000601'),
                //    //h('div', 'Код подразделения банка по месте ведения счета карты (для внутренних переводов по системе Сбербанка России): 1685980180'),
                //    //h('div', 'Адрес подразделения Банка по месту ведения счета карты: г. Уфа, ул.Революционная, 49')
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Получатель: '), h(bem('div#info-details-v'), 'ВАЛИКОВА ВИКТОРИЯ НИКОЛАЕВНА')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Счет получателя: '), h(bem('div#info-details-v'), '40817810006002449548')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Банк получателя: '), h(bem('div#info-details-v'), 'ОТДЕЛЕНИЕ N8598 СБЕРБАНКА РОССИИ г. УФА')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'БИК банка получателя: '), h(bem('div#info-details-v'), '048073601')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Корреспонденский счет: '), h(bem('div#info-details-v'), '30101810300000000601')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Код подразделения банка по месте ведения счета карты (для внутренних переводов по системе Сбербанка России): '), h(bem('div#info-details-v'), '1685980180')
                //    ),
                //    h(bem('div#info-details-section'),
                //        h(bem('div#info-details-h'), 'Адрес подразделения Банка по месту ведения счета карты: '), h(bem('div#info-details-v'), 'г. Уфа, ул.Революционная, 49')
                //    )
                //),
                //h(bem('div#info-p'),
                //    'Реквизиты для валютных переводов:'
                //),
                //h(bem('div#info-details'),
                //    h('div', 'Получатель: VALIKOVA VIKTORIA NIKOLAEVNA'),
                //    h('div', 'Счет получателя: 40817810006002449548'),
                //    h('div', 'Наименование банка получателя: SBERBANK (URALSKY HEAD OFFICE) EKATERINBURG RUSSIAN FEDERATION'),
                //    h('div', 'SWIFT-код: SABRRUMMEA1'),
                //    h('div', 'Код подразделения Банка по месте ведения счета карты (для внутренних переводов по системе Сбербанка России):1685980180')
                //)
            )
        }
        return null
    }

    renderButton = () => {
        const {
            provider,
            } = this.props

        if (provider === YANDEX_MONEY) {
            return this.renderYandexForm()
        }
        else if (provider === PAYPAL) {
            return this.renderPaypalForm()
        }
        else {
            return this.renderSberbankForm()
        }
    }

    render() {
        return h(bem('div'),
            this.renderProviderOptions(),
            this.renderCurrencyOptions(),
            this.renderAmountOptions(),
            this.renderAmount(),
            this.renderInfo(),
            this.renderButton()
        )
    }
}

