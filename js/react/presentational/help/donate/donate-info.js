import {Component} from 'react'
import {h} from 'react-markup'

import prefixer from 'bem-prefixer'

import {AmountOptionType, ProviderType} from '~/shared/definitions'
const {OPTION_OTHER} = AmountOptionType

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

    //todo: use i18n
    formatMoney = (amount, currency) => {
        const {i18n} = this.props
        return i18n.t('strings', 'help/main-donation-form/money-template')
            .replace(/\{amount\}/g, amount)
            .replace(/\{currency\}/g, i18n.settings.currency[currency].symbol)
    }

    render() {
        const {i18n} = this.props
        const {
            amountOption,
            amount,
            currency,
            provider,
            } = this.props

        if (amountOption === OPTION_OTHER || provider === ProviderType.SBERBANK) {
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

