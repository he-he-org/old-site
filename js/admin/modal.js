import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const bem = prefixer('Modal')

const Modal = createClass({
    displayName: 'Modal',

    render() {
        return (
            h(bem('div'),
                h(bem('div#holder'),
                    this.props.children
                )
            )
        )
    },
})

export default Modal
