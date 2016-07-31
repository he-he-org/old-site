import {createClass, PropTypes} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"

import TableView from "./table-view"
import Modal from "./modal"
const bem = prefixer("ManyToOneModal")

const ManyToManyModal = createClass({

    displayName: "ManyToManyModal",

    getInitialState() {
        return {
            value: this.props.value || [],
        }
    },

    componentWillReceiveProps({value}) {
        this.setState({
            value: value || null,
        })
    },

    getResourceScheme(props = this.props) {
        const {context: {config: {scheme}}, resourceName} = props
        return scheme.filter((x) => x.name === resourceName)[0] //todo: use util
    },

    selectRecord(record) {
        const {value} = this.state
        this.setState({
            value: value.filter((x) => x.id !== record.id).concat([record]),
        })
    },

    deleteRecord(record) {
        const {value} = this.state
        this.setState({
            value: value.filter((x) => x.id !== record.id),
        })
    },

    save() {
        this.props.onSave(this.state.value)
    },

    render() {
        const {scheme, resourceName, onCancel, context} = this.props
        const value = this.state.value || []

        return (
            h(bem("div"),
                h(Modal,
                    h("div", value.map((record) => (
                        h("div",
                            {key: record.id},
                            h("span", Object.keys(record).map((key) => key + ":" + record[key]).join(", ")),
                            h("button", {onClick: this.deleteRecord.bind(null, record)}, "del")
                        )
                    ))),
                    h(TableView, {
                        scheme,
                        resourceName,
                        enableRecordSelect: true,
                        onRecordSelect: this.selectRecord,
                        context,
                    }),
                    h("button", {onClick: this.save}, "Save"),
                    h("button", {onClick: onCancel}, "Cancel")
                )
            )
        )
    },
})

ManyToManyModal.propTypes = {
    context: PropTypes.object.isRequired,

    resourceName: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    value: PropTypes.array,
}

export default ManyToManyModal
