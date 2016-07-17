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
                type: "text",
                value: record[attr.name] === null ? "" : record[attr.name],
                onChange: this.handleAttrChange.bind(this, attr.name),
            })
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
                h("table",
                    h("thead",
                        h("tr",
                            h("th", "Name"),
                            h("th", "Value")
                        )
                    ),
                    h("tbody", attrs.filter((x) => x.name !== "id").map((attr) => (
                        h("tr", {key: attr.name},
                            h("td", attr.name),
                            h("td",
                                this.renderInput(record, attr)
                            )
                        )
                    )).concat([
                        h("tr", {key: "controls"},
                            h("td",
                                h("button", {onClick: this.save}, "Save"),
                                h("button", {onClick: this.cancel}, "Cancel")
                            )
                        ),
                    ]))
                )
            )
        )
    },
})

export default SingleView
