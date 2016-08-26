import {createClass, PropTypes} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import TableView from './table-view'
import Modal from './modal'
const bem = prefixer('ManyToOneModal')

const ManyToOneModal = createClass({

    displayName: 'ManyToOneModal',

    render() {
        const {resourceName, onCancel, onSelect, context} = this.props

        return (
            h(bem('div'),
                h(Modal,
                    h(TableView, {
                        resourceName,
                        enableRecordSelect: true,
                        onRecordSelect: onSelect,
                        context,
                    }),
                    h('button', {onClick: onCancel}, 'Cancel')
                )
            )
        )
    },
})

ManyToOneModal.propTypes = {
    context: PropTypes.object.isRequired,
    resourceName: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default ManyToOneModal
