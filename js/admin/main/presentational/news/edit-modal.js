const COMPONENT_NAME = 'NewsEditModal'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import Modal from '../modal'
import Edit from './edit'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    getDefaultProps() {
        return {
            item: {
                id: null,
                published: false,
                image: '',
                title: {
                    'ru-RU': '',
                    'en-US': '',
                    'es-ES': '',
                },
                text: {
                    'ru-RU': '',
                    'en-US': '',
                    'es-ES': '',
                },
                date: Date.now(),
                tags: [],
            },
        }
    },

    componentWillReceiveProps(props) {
        this.setState({
            item: props.item,
        })
    },

    getInitialState() {
        return {
            item: this.props.item,
        }
    },

    handleChangeTitle(lang, title) {
        const {item} = this.state
        this.setState({
            item: {
                ...item,
                title: {
                    ...item.title,
                    [lang]: title,
                },
            },
        })
    },

    handleChangeText(lang, text) {
        const {item} = this.state
        this.setState({
            item: {
                ...item,
                text: {
                    ...item.text,
                    [lang]: text,
                },
            },
        })
    },

    handleChangePublished(published) {
        const {item} = this.state
        this.setState({
            item: {
                ...item,
                published,
            },
        })
    },

    handleChangeDate(date) {
        const {item} = this.state
        this.setState({
            item: {
                ...item,
                date,
            },
        })
    },

    handleChangeImage(image) {
        const {item} = this.state
        this.setState({
            item: {
                ...item,
                image,
            },
        })
    },

    handleChangeTags(tagId, checked) {
        const {item} = this.state
        const newTags = checked
            ? item.tags.filter((x) => x !== tagId).concat([tagId])
            : item.tags.filter((x) => x !== tagId)
        this.setState({
            item: {
                ...item,
                tags: newTags,
            },
        })
    },

    handleSave() {
        this.props.onSave(this.state.item)
    },

    handleCancel() {
        this.props.onCancel()
    },

    render() {
        const {tags} = this.props
        const {item} = this.state
        return h(Modal,
            h(b('div'),
                h(b('div#body'),
                    h(Edit, {
                        item,
                        availableTags: tags,
                        onChangeTitle: this.handleChangeTitle,
                        onChangeText: this.handleChangeText,
                        onChangePublished: this.handleChangePublished,
                        onChangeDate: this.handleChangeDate,
                        onChangeTags: this.handleChangeTags,
                        onChangeImage: this.handleChangeImage,
                    }),
                    h(b('div#controls'),
                        h('button', {onClick: this.handleSave}, 'Save'),
                        h('button', {onClick: this.handleCancel}, 'Cancel')
                    )
                )
            )
        )
    },
})
