import {createClass, PropTypes} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"

import TableView from "./table-view"
import Modal from "./modal"
const bem = prefixer("ManyToOneModal")

const ManyToOneModal = createClass({

    render() {
        const {scheme, resourceName, onCancel, onSelect} = this.props

        return (
            h(bem("div"),
                h(Modal,
                    h(TableView, {
                        scheme,
                        resourceName,
                        enableRecordSelect: true,
                        onRecordSelect: onSelect,
                    }),
                    h("button", {onClick: onCancel}, "Cancel")
                )
            )
        )
    },
})

ManyToOneModal.propTypes = {
    scheme: PropTypes.array.isRequired,
    resourceName: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default ManyToOneModal
