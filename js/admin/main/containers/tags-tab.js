const COMPONENT_NAME = 'TagsTab'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import TagsTable from '../presentational/tags/table/' // todo: use absolute
import TagsEditModal from '../presentational/tags/edit-modal/'  // todo: use absolute

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    getInitialState() {
        return {
            creating: false,
            editingId: null,
        }
    },

    handleCreateStart() {
        this.setState({
            creating: true,
        })
    },

    handleCreateCancel() {
        this.setState({
            creating: false,
        })
    },

    handleCreate(tag) {
        this.props.onCreateTag(tag)
        this.setState({
            creating: false,
        })
    },

    handleEditStart(id) {
        this.setState({
            editingId: id,
        })
    },

    handleEditCancel(id) {
        this.setState({
            editingId: id,
        })
    },

    handleEdit(tag) {
        this.props.onUpdateTag(tag)
        this.setState({
            editingId: null,
        })
    },

    render() {
        const {data} = this.props
        const {tags} = data
        const {creating, editingId} = this.state

        const dataEditing = tags.filter((x) => x.id === editingId)[0]
        let editingTag = null
        if (dataEditing) {
            editingTag = {
                id: dataEditing.id,
                title: dataEditing.title,
            }
        }

        return h(b('dim'),
            creating && h(TagsEditModal, {
                onSave: this.handleCreate,
                onCancel: this.handleCreateCancel,
            }),
            editingTag !== null && h(TagsEditModal, {
                tag: editingTag,
                onSave: this.handleEdit,
                onCancel: this.handleEditCancel,
            }),
            h(TagsTable, {
                tags,
                onCreate: this.handleCreateStart,
                onDelete: this.props.onDeleteTag,
                onEdit: this.handleEditStart,
            })
        )
    },
})
