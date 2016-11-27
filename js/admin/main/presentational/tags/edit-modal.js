const COMPONENT_NAME = 'TagsEditModal'

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
            tag: {
                title: {
                    'ru-RU': '',
                    'en-US': '',
                    'es-ES': '',
                },
            },
        }
    },
    componentWillReceiveProps(props) {
        this.setState({
            tag: props.tag,
        })
    },
    getInitialState() {
        return {
            tag: this.props.tag,
        }
    },
    handleChangeTitle(lang, value) {
        const {state} = this
        this.setState({
            ...state,
            tag: {
                ...state.tag,
                title: {
                    ...state.tag.title,
                    [lang]: value,
                },
            },
        })
    },

    handleSave() {
        this.props.onSave(this.state.tag)
    },

    render() {
        return h(Modal,
            h(b('div'),
                h(b('div#body'),
                    h(Edit, {tag: this.state.tag, onChangeTitle: this.handleChangeTitle}),
                    h(b('div#controls'),
                        h('button', {onClick: this.handleSave}, 'Save'),
                        h('button', {onClick: this.props.onCancel}, 'Cancel')
                    )
                )
            )
        )
    },
})
