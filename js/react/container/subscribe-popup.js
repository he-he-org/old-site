require('is-nan').shim()

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DonateModal from '~/react/presentational/shared/subscribe-modal'
import * as modalActionCreators from '~/react/action-creators/modal'

const mapStateToProps = (i18n) => (state) => {
    return {
        ...state,
        i18n,
        form: {
            u: 'e76e85fae8dbe9ca9478d5e80',
            id: '32e3e4a656',
        },
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(modalActionCreators, dispatch),
    }
}

export default (i18n) => connect(mapStateToProps(i18n), mapDispatchToProps)(DonateModal)
