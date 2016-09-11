require('is-nan').shim()

import {connect} from 'react-redux'
import DonateInfo from '~/react/presentational/help/donate/donate-info'

const mapStateToProps = (i18n) => (state) => {
    return {...state, i18n}
}
const mapDispatchToProps = () => {
    return {}
}

export default (i18n) => connect(mapStateToProps(i18n), mapDispatchToProps)(DonateInfo)
