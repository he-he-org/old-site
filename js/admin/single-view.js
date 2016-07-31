import {createClass, PropTypes} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"
import {merge} from "functional-utils"

import ManyToOneModal from "./many-to-one-modal"
import ManyToManyModal from "./many-to-many-modal"
const bem = prefixer("SingleView")


const SingleView = createClass({
    displayName: "SingleView",

    getInitialState() {
        return {
            record: this.props.record,
            editingLinkAttr: null,
        }
    },


    componentWillReceiveProps(props) {
        this.setState({
            record: props.record,
            editingLink: null,
        })
    },

    getResourceScheme(props = this.props) {
        const {context: {config: {scheme}}, resourceName} = props
        return scheme.filter((x) => x.name === resourceName)[0] //todo: use util
    },

    handleAttrChange(attr, e) {
        const {record} = this.state

        this.setState({
            record: merge(record, {
                [attr]: e.target.value,
            }),
        })
    },

    save() {
        this.props.onSave(this.state.record)
    },

    cancel() {
        this.props.onCancel()
    },

    editLinkAttr(attr) {
        this.setState({
            editingLinkAttr: attr,
        })
    },

    cancelEditLinkAttr() {
        this.setState({
            editingLinkAttr: null,
        })
    },

    changeEditLinkAttr(newValue) {
        const {editingLinkAttr, record} = this.state

        this.setState({
            editingLinkAttr: null,
            record: merge(record, {
                [editingLinkAttr.name]: newValue,
            }),
        })
    },

    renderInput(record, attr) {
        if (attr.type === "text") {
            return h("textarea", {
                value: record[attr.name] === null ? "" : record[attr.name],
                onChange: this.handleAttrChange.bind(null, attr.name),
            })
        }
        else if (attr.type === "manyToOne") {
            return h("button", {onClick: this.editLinkAttr.bind(null, attr)},
                record[attr.name] === null ? "null" : "[" + record[attr.name].id + "]"
            )
        }
        else if (attr.type === "manyToMany") {
            return h("button", {onClick: this.editLinkAttr.bind(null, attr)},
                record[attr.name] === null ? "null" : "[" + record[attr.name].map((x) => x.id).join(", ") + "]"
            )
        }
        else {
            return h("input", {
                type: "text",
                value: record[attr.name] === null ? "" : record[attr.name],
                onChange: this.handleAttrChange.bind(null, attr.name),
            })
        }
    },

    renderEditingLinkAttrModal() {
        const {editingLinkAttr, record} = this.state
        const {context} = this.props

        if (editingLinkAttr !== null) {
            const value = record[editingLinkAttr.name]
            const typeParams = editingLinkAttr[editingLinkAttr.type]
            if (editingLinkAttr.type === "manyToOne") {
                return h(ManyToOneModal, {
                    resourceName: typeParams.to,
                    value,
                    onCancel: this.cancelEditLinkAttr,
                    onSelect: this.changeEditLinkAttr,
                    context,
                })
            }
            else if (editingLinkAttr.type === "manyToMany") {
                return h(ManyToManyModal, {
                    resourceName: typeParams.to,
                    value,
                    onCancel: this.cancelEditLinkAttr,
                    onSave: this.changeEditLinkAttr,
                    context,
                })
            }
            else {
                throw new Error(`Editing for '${editingLinkAttr.type}' relations is not imlemented yet`)
            }
        }
        else {
            return null
        }
    },

    render() {
        const {record} = this.state
        const {attrs} = this.getResourceScheme()

        return (
            h(bem("div"),
                this.renderEditingLinkAttrModal(),

                h(bem("div#fields"), attrs.filter((x) => x.name !== "id").map((attr) => (
                    h(bem("label#field"), {key: attr.name},
                        h(bem("div#title"), attr.name),
                        h(bem("div#input"),
                            this.renderInput(record, attr)
                        )
                    )
                )).concat([
                    h(bem("div#controls"), {key: "controls"},
                        h("button", {onClick: this.save}, "Save"),
                        h("button", {onClick: this.cancel}, "Cancel")
                    ),
                ]))
            )
        )
    },
})

SingleView.propTypes = {
    context: PropTypes.object.isRequired,
    resourceName: PropTypes.string.isRequired,
}

export default SingleView
