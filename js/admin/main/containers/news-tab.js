const COMPONENT_NAME = 'NewsTab'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import NewsTable from '../presentational/news/table/'
import NewsEditModal from '../presentational/news/edit-modal'
import ControlPanel from '../presentational/news/control-panel'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    getInitialState() {
        return {
            lang: 'en-US',
            selectedId: null,
            editingId: null,
            creating: false,
        }
    },

    handleChangeLanguage(newLang) {
        this.setState({
            lang: newLang,
        })
    },

    onSelectItem(id) {
        this.setState({
            selectedId: id,
        })
    },

    onEditItem(id) {
        this.setState({
            editingId: id,
        })
    },

    onDeleteItem(id) {
        this.props.onDeleteItem(id)
    },

    handleCreateItemStart() {
        this.setState({
            creating: true,
        })
    },

    handleCreateItemCancel() {
        this.setState({
            creating: false,
        })
    },

    handleCreateItem(item) {
        this.props.onCreateItem(item)
    },

    handleEditItemStart(id) {
        this.setState({
            editingId: id,
        })
    },

    handleEditItemCancel() {
        this.setState({
            editingId: null,
        })
    },

    handleEditItem(item) {
        this.props.onUpdateItem(item)
    },

    render() {
        const {selectedId, editingId, creating, lang} = this.state
        const {data} = this.props

        const items = data.newsItems.map(({id, title, tags, published}) => {
            return {
                id,
                active: id === selectedId,
                published,
                title: title[lang],
                tags: tags.map(({id}) => {
                    const dataTag = data.tags.filter((x) => x.id === id)[0]
                    return {
                        id: dataTag.id,
                        title: dataTag.title[lang],
                    }
                }),
            }
        })

        const tags = data.tags.map(({id, title}) => {
            return {
                id,
                title: title[lang], //todo: alsways use default language?
            }
        })

        const dataCurrent = data.newsItems.filter((x) => x.id === selectedId)[0]
        let current = null
        if (dataCurrent) {
            current = {
                id: dataCurrent.id,
                image: dataCurrent.image_url,
                title: dataCurrent.title[lang],
                text: dataCurrent.text[lang],
            }
        }

        const dataEditing = data.newsItems.filter((x) => x.id === editingId)[0]
        let editing = null
        if (dataEditing) {
            editing = {
                id: dataEditing.id,
                date: new Date(dataEditing.date).getTime(),
                image: dataEditing.image_url,
                published: dataEditing.published === 1,
                text: dataEditing.text,
                title: dataEditing.title,
                tags: dataEditing.tags.map(({id}) => id),
            }
        }


        return h(b('div'),
            creating && h(NewsEditModal, {
                tags,
                onSave: this.handleCreateItem,
                onCancel: this.handleCreateItemCancel,
            }),
            editing !== null && h(NewsEditModal, {
                tags,
                item: editing,
                onSave: this.handleEditItem,
                onCancel: this.handleEditItemCancel,
            }),
            h(ControlPanel, {
                language: lang,
                onCreate: this.handleCreateItemStart,
                onChangeLanguage: this.handleChangeLanguage,
            }),
            h(NewsTable, {
                onSelect: this.onSelectItem,
                onDelete: this.onDeleteItem,
                onEdit: this.handleEditItemStart,
                items,
                current,
            })
        )
    },
})
