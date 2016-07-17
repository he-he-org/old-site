import {createClass} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"
import {merge} from "functional-utils"

import Modal from "./modal"
import SingleView from "./single-view"
import {patchRecord, deleteRecord, fetchCollection, postRecord} from "./api"
import {error} from "./alerts"

const bem = prefixer("TableView")

const TableView = createClass({

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

    editRecord(record) {
        this.setState({
            editingRecord: record,
        })
    },


    updateRecord(record) {
        const {scheme} = this.props
        patchRecord(scheme, record)
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
        const {scheme} = this.props
        this.setState({
            creatingRecord: scheme.attrs.reduce((acc, attr) => (
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
        const {scheme} = this.props
        postRecord(scheme, record)
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
        const {scheme} = props
        this.setState({
            loading: true,
            data: null,
        }, () => {
            const pagination = this.state.pagination || {}
            const params = {
                page: pagination.currentPage || 1,
            }
            return fetchCollection(scheme, params).then(({pagination, data}) => {
                this.setState({
                    loading: false,
                    pagination,
                    data,
                })
            })
        })
    },

    deleteRecord(record) {
        const {scheme} = this.props
        deleteRecord(scheme, record)
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

    render() {
        const {scheme} = this.props
        const {attrs} = scheme
        const {editingRecord, creatingRecord, data, loading} = this.state

        if (loading) {
            return h(bem("div"), "Loading")
        }

        return (
            h(bem("div"),
                editingRecord && h(Modal,
                    h(SingleView, {
                        scheme,
                        record: editingRecord,
                        onSave: this.updateRecord,
                        onCancel: this.cancelEditRecord,
                    })
                ),
                creatingRecord && h(Modal,
                    h(SingleView, {
                        scheme,
                        record: creatingRecord,
                        onSave: this.saveCreateRecord,
                        onCancel: this.cancelCreateRecord,
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
                        h("tr", {key: record.id},
                            attrs.map((field) => (
                                h("td", {key: `${record.id}-${field.name}`},
                                    record[field.name] === null ? "null" : record[field.name])
                            )).concat([
                                h("td", {key: "controls"},
                                    h("button", {onClick: this.editRecord.bind(null, record)}, "Edit"),
                                    h("button", {onClick: this.deleteRecord.bind(null, record)}, "Delete")
                                ),
                            ])
                        ))
                    ))
                )
            )
        )
    },
})

export default TableView
