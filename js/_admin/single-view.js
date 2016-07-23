import {createClass} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"
import {merge} from "functional-utils"

const bem = prefixer("SingleView")

const SingleView = createClass({

    getInitialState() {
        return {
            record: this.props.record,
        }
    },

    componentWillReceiveProps(props) {
        this.setState({
            record: props.record,
        })
    },


    handleAttrChange(field, e) {
        const {record} = this.state

        this.setState({
            record: merge(record, {
                [field]: e.target.value,
            }),
        })
    },

    save() {
        this.props.onSave(this.state.record)
    },

    cancel() {
        this.props.onCancel()
    },

    renderInput(record, attr) {
        if (attr.type === "text") {
            return h("textarea", {
                value: record[attr.name] === null ? "" : record[attr.name],
                onChange: this.handleAttrChange.bind(this, attr.name),
            })
        }
        else if (attr.type === "manyToOne") {
            return h("button",
                record[attr.name] === null ? "null" : "[" + record[attr.name].id + "]"
            )
        }
        else if (attr.type === "manyToMany") {
            return h("button",
                record[attr.name] === null ? "null" : "[" + record[attr.name].map((x) => x.id).join(", ") + "]"
            )
        }
        else {
            return h("input", {
                type: "text",
                value: record[attr.name] === null ? "" : record[attr.name],
                onChange: this.handleAttrChange.bind(this, attr.name),
            })
        }
    },

    render() {
        const {scheme} = this.props
        const {record} = this.state
        const {attrs} = scheme

        return (
            h(bem("div"),
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

export default SingleView
