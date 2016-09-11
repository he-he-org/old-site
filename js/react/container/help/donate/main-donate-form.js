require('is-nan').shim()

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import MainDonationForm from '~/react/presentational/shared/main-donation-form'
import * as formActionCreators from '~/react/action-creators/main-donation-form'

const mapStateToProps = (i18n) => (state) => {
    return {...state, i18n}
}
const mapDispatchToProps = (dispatch) => {
    const actionCreators = bindActionCreators(formActionCreators, dispatch)
    return {
        onChangeAmount: actionCreators.setAmount,
        onChangeProvider: actionCreators.setProvider,
        onChangeCurrency: actionCreators.setCurrency,
        onChangeAmountOption: actionCreators.setAmountOption,
    }
}

export default (i18n) => connect(mapStateToProps(i18n), mapDispatchToProps)(MainDonationForm)
