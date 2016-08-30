import {Component} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const bem = prefixer('donate-modal')

export default class DonateModal extends Component {
    render() {
        const {displayed} = this.props
        const {onClose} = this.props
        const modifiers = !displayed ? ['hidden'] : []
        return h(bem('div', modifiers),
            h(bem('div#content'),
                this.props.children
            ),
            h(bem('div#background'), {onClick: onClose})
        )
    }
}
