import {Component} from 'react'
import {h} from 'react-markup'

import {CurrencyType, AmountOptionType} from '../../shared/definitions'
const {RUR, USD, EUR} = CurrencyType
const {OPTION_OTHER} = AmountOptionType
import prefixer from 'bem-prefixer'

const bem = prefixer('section-donate-info')


const variants = {
    [AmountOptionType.OPTION_SUM_1]: {
        'forUs': [
            'help/donate/info/300/for-us/options/1',
            'help/donate/info/300/for-us/options/2',
            'help/donate/info/300/for-us/options/3',
        ],
        'forThem': [
            'help/donate/info/300/for-them/options/1',
        ],
    },
    [AmountOptionType.OPTION_SUM_2]: {
        'forUs': [
            'help/donate/info/500/for-us/options/1',
            'help/donate/info/500/for-us/options/2',
            'help/donate/info/500/for-us/options/3',
        ],
        'forThem': [
            'help/donate/info/500/for-them/options/1',
        ],
    },
    [AmountOptionType.OPTION_SUM_3]: {
        'forUs': [
            'help/donate/info/1000/for-us/options/1',
            'help/donate/info/1000/for-us/options/2',
        ],
        'forThem': [
            'help/donate/info/1000/for-them/options/1',
            'help/donate/info/1000/for-them/options/2',
            'help/donate/info/1000/for-them/options/3',
        ],
    },
}

const randomVariant = (variants) => variants[Math.floor(Math.random() * variants.length)]

class DonateInfo extends Component {

    //todo: copied from main-donation-form, generalize
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

    render() {
        const {i18n} = this.props
        const {
            amountOption,
            amount,
            currency,
            } = this.props

        if (amountOption === OPTION_OTHER) {
            return h(bem('div'),
                h(bem('div#block'))
            )
        }
        else {
            return h(bem('div'),
                h(bem('div#block'),
                    h(bem('div#amount'), this.formatMoney(amount, currency)),
                    h(bem('div#title'), i18n.t('strings', 'help/donate/info/for-us/title')),
                    h(bem('div#desc-container'),
                        h(bem('div#desc'), i18n.t('strings', randomVariant(variants[amountOption].forUs)))
                    ),
                    h(bem('div#title'), i18n.t('strings', 'help/donate/info/for-them/title')),
                    h(bem('div#desc-container'),
                        h(bem('div#desc'), i18n.t('strings', randomVariant(variants[amountOption].forThem)))
                    )
                )
            )
        }
    }
}

export default DonateInfo

