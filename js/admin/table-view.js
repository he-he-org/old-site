import {createClass, PropTypes} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"
import {merge} from "functional-utils"

import Modal from "./modal"
import SingleView from "./single-view"
import {error} from "./alerts"

const bem = prefixer("TableView")

const TableView = createClass({
    displayName: "TableView",

    getInitialState() {
        return {
            loading: true,
            editingRecord: null,
            editingRecordError: null,
            creatingRecord: null,
            pagination: null,
            data: null,
        }
    },

    componentDidMount() {
        this.sync()
    },

    componentWillReceiveProps(props) {
        this.sync(props)
    },

    getResourceScheme(props = this.props) {
        const {context: {config: {scheme}}, resourceName} = props
        return scheme.filter((x) => x.name === resourceName)[0] //todo: use util
    },

    editRecord(record) {
        this.setState({
            editingRecord: record,
        })
    },


    updateRecord(record) {
        const {context: {dao}, resourceName} = this.props

        dao.updateRecord(resourceName, record, this.state.editingRecord)
            .then(() => {
                this.setState({
                    editingRecord: null,
                })
            })
            .then(this.sync)
            .catch((e) => {
                error(e.entity.message)
            })
    },

    cancelEditRecord() {
        this.setState({
            editingRecord: null,
        })
    },


    createRecord() {
        const resourceScheme = this.getResourceScheme()
        this.setState({
            creatingRecord: resourceScheme.attrs.reduce((acc, attr) => (
                merge(acc, {
                    [attr.name]: null,
                })
            ), {}),
        })
    },

    cancelCreateRecord() {
        this.setState({
            creatingRecord: null,
        })
    },

    saveCreateRecord(record) {
        const {context: {dao}, resourceName} = this.props
        dao.createRecord(resourceName, record)
            .then(() => {
                this.setState({
                    creatingRecord: null,
                })
            })
            .then(() => this.sync())
            .catch((e) => {
                error(e.entity.message)
            })
    },

    sync(props = this.props) {
        const {context: {dao}, resourceName} = props
        this.setState({
            loading: true,
            data: null,
        }, () => {
            const pagination = this.state.pagination || {}
            const params = {
                page: pagination.currentPage || 1,
            }
            return dao.fetchResource(resourceName, params).then(({pagination, data}) => {
                this.setState({
                    loading: false,
                    pagination,
                    data,
                })
            })
        })
    },

    deleteRecord(record) {
        const {context: {dao}} = this.props
        const resourceScheme = this.getResourceScheme()
        dao.deleteRecord(resourceScheme, record)
            .then(() => this.sync())
            .catch((e) => {
                error(e.entity.message)
            })
    },

    prevPage() {
        const {pagination: {currentPage}} = this.state
        if (currentPage > 1) {
            this.setState({
                pagination: merge(this.state.pagination, {
                    currentPage: currentPage - 1,
                }),
            }, () => {
                this.sync()
            })
        }
    },

    nextPage() {
        const {pagination: {currentPage, pageCount}} = this.state
        if (currentPage < pageCount) {
            this.setState({
                pagination: merge(this.state.pagination, {
                    currentPage: currentPage + 1,
                }),
            }, () => {
                this.sync()
            })
        }
    },

    renderPagination() {
        const {pagination} = this.state
        return h(bem("div#pagination"),
            h("button", {onClick: this.prevPage}, "Previous page"),
            h("span", `${pagination.currentPage} / ${pagination.pageCount}`),
            h("button", {onClick: this.nextPage}, "Next page"),
            h("span", ` (per page: ${pagination.perPage}, total: ${pagination.totalCount})`)
        )
    },

    renderAttr(record, attr) {
        const {context: {config: {renderers}}, resourceName} = this.props
        const renderer = renderers[resourceName][attr.name]
        const value = record[attr.name]
        return renderer(value)
    },

    renderRecord(record) {
        const {attrs} = this.getResourceScheme()
        const {enableRecordSelect, onRecordSelect} = this.props

        const onClick = enableRecordSelect
            ? onRecordSelect.bind(null, record)
            : null

        return h("tr", {key: record.id, onClick},
            attrs.map((attr) => (
                h("td", {key: `${record.id}-${attr.name}`},
                    this.renderAttr(record, attr))
            )).concat([
                h("td", {key: "controls"},
                    h("button", {onClick: this.editRecord.bind(null, record)}, "Edit"),
                    h("button", {onClick: this.deleteRecord.bind(null, record)}, "Delete")
                ),
            ])
        )
    },

    render() {
        const {resourceName, context} = this.props
        const {editingRecord, creatingRecord, data, loading} = this.state

        const {attrs} = this.getResourceScheme()

        if (loading) {
            return h(bem("div"), "Loading")
        }

        return (
            h(bem("div"),
                editingRecord && h(Modal,
                    h(SingleView, {
                        resourceName,
                        record: editingRecord,
                        onSave: this.updateRecord,
                        onCancel: this.cancelEditRecord,
                        context,
                    })
                ),
                creatingRecord && h(Modal,
                    h(SingleView, {
                        resourceName,
                        record: creatingRecord,
                        onSave: this.saveCreateRecord,
                        onCancel: this.cancelCreateRecord,
                        context,
                    })
                ),
                h("button", {onClick: this.createRecord}, "Create"),
                this.renderPagination(),
                h("table",
                    h("thead",
                        h("tr", attrs.map((field) => (
                            h("th", {key: field.name}, field.name)
                        )))
                    ),
                    h("tbody", data.map((record) => (
                        this.renderRecord(record)
                    ))
                )
            )
        ))
    },
})

TableView.propTypes = {
    context: PropTypes.object.isRequired,
    resourceName: PropTypes.string.isRequired,

    enableRecordSelect: PropTypes.bool,
    onRecordSelect: PropTypes.func,
}

TableView.defaultProps = {
    enableRecordSelect: false,
    onRecordSelect: null,
}


export default TableView
