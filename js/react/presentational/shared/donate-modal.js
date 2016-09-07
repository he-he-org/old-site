import {Component} from 'react'
import {h} from 'react-markup'

import Modal from './modal'
import MainDonationForm from './main-donation-form'

class DonateModal extends Component {
    render() {
        const {i18n} = this.props
        const {modal, form} = this.props

        const {
            setModalDisplayed,
            } = this.props

        const {
            setProvider,
            setCurrency,
            setAmountOption,
            setAmount,
            } = this.props

        return h(Modal, {
            ...modal,
            onClose: () => setModalDisplayed(false),
        },
            h(MainDonationForm, {
                i18n,
                onChangeProvider: setProvider,
                onChangeCurrency: setCurrency,
                onChangeAmountOption: setAmountOption,
                onChangeAmount: setAmount,
                ...form,
            })
        )
    }
}

export default DonateModal
