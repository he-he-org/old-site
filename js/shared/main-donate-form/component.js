import {Component} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'


import {ProvideType, CurrencyType, AmountOptionType, currencyOptionsToAmount} from '../definitions'
const {YANDEX_MONEY, PAYPAL} = ProvideType
const {RUR, USD, EUR} = CurrencyType
const {OPTION_SUM_1, OPTION_SUM_2, OPTION_SUM_3, OPTION_OTHER} = AmountOptionType

const YM_URL = 'https://money.yandex.ru/quickpay/confirm.xml'
const YM_RECEIVER = '410012180500847' //todo: move to config
const YM_QUICKPAY_FORM = 'donate' // Тип транзакции
const YM_PAYMENT_TYPE = 'PC' // Способ оплаты

const PP_URL = '/paypal'

const bem = prefixer('main-donate-form')

export default class extends Component {
    getCurrencySign = (currency) => {
        if (currency === RUR) return '₽'
        else if (currency === USD) return '$'
        else if (currency === EUR) return '€'
        else throw new Error(`Currency isn't supported: ${currency}`)
    }

    formatMoney = (amount, currency) => {
        const {i18n} = this.props
        return i18n.t('strings', 'help/main-donation-form/money-template')
            .replace(/\{amount\}/g, amount)
            .replace(/\{currency\}/g, this.getCurrencySign(currency))
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
        return h(bem('div#options'),
            h(bem('div', 'option', provider === YANDEX_MONEY ? ['active'] : []),
                {onClick: onChangeProvider.bind(null, ProvideType.YANDEX_MONEY)},
                i18n.t('strings', 'help/donate/provider-options/ym')
            ),
            h(bem('div', 'option', provider === PAYPAL ? ['active'] : []),
                {onClick: onChangeProvider.bind(null, ProvideType.PAYPAL)},
                'PayPal'
            )
        )
    }

    renderCurrencyOptions = () => {
        const {
            currency,
            provider,
            onChangeCurrency,
            } = this.props

        if (provider === PAYPAL) {
            return h(bem('div#options'),
                h(bem('div', 'option', currency === RUR ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, RUR)},
                    this.getCurrencySign(RUR)
                ),
                h(bem('div', 'option', currency === USD ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, USD)},
                    this.getCurrencySign(USD)
                ),
                h(bem('div', 'option', currency === EUR ? ['active'] : []),
                    {onClick: onChangeCurrency.bind(null, EUR)},
                    this.getCurrencySign(EUR)
                )
            )
        }
        return null
    }

    renderAmountOptions = () => {
        const {
            i18n,
            currency,
            amountOption,
            onChangeAmountOption,
            } = this.props

        return h(bem('div#options'),
            h(bem('div', 'option', amountOption === OPTION_SUM_1 ? ['active'] : []),
                {onClick: onChangeAmountOption.bind(null, OPTION_SUM_1)},
                this.formatMoney(currencyOptionsToAmount[currency][OPTION_SUM_1], currency)),
            h(bem('div', 'option', amountOption === OPTION_SUM_2 ? ['active'] : []),
                {onClick: onChangeAmountOption.bind(null, OPTION_SUM_2)},
                this.formatMoney(currencyOptionsToAmount[currency][OPTION_SUM_2], currency)),
            h(bem('div', 'option', amountOption === OPTION_SUM_3 ? ['active'] : []),
                {onClick: onChangeAmountOption.bind(null, OPTION_SUM_3)},
                this.formatMoney(currencyOptionsToAmount[currency][OPTION_SUM_3], currency)),
            h(bem('div', 'option', amountOption === OPTION_OTHER ? ['active'] : []),
                {onClick: onChangeAmountOption.bind(null, OPTION_OTHER)},
                i18n.t('strings', 'help/donate/amount-options/other-amount'))
        )
    }

    renderAmount = () => {
        const {
            i18n,
            amount,
            amountOption,
            currency,
            } = this.props

        if (amountOption === AmountOptionType.OPTION_OTHER) {
            const template = i18n.t('strings', 'help/main-donation-form/money-template').replace(/ /g, '\u00a0')
            const parts = template.split('{amount}')
            const renderingParts = []
            parts.forEach((part, i) => {
                if (i !== 0) {
                    renderingParts.push(h('input', {value: amount, size: 4, onChange: this.handleChangeAmount}))
                }
                renderingParts.push(part.replace('{currency}', this.getCurrencySign(currency)))
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
        if (currency === RUR) {
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
            throw new Error(`Wrong provider value: ${provider}`)
        }
    }

    render() {
        return h(bem('div'),
            this.renderProviderOptions(),
            this.renderCurrencyOptions(),
            this.renderAmountOptions(),
            this.renderAmount(),
            this.renderButton()
        )
    }
}

