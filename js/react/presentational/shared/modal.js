import {Component} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const bem = prefixer('modal')

export default class Modal extends Component {

    componentDidMount() {
        this.listener = window.addEventListener('keydown', (e) => {
            if (this.props.displayed) {
                const ESCAPE_CODE = 27
                if (e.keyCode === ESCAPE_CODE) {
                    this.props.onClose()
                }
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener)
    }

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
