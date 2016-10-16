import {h} from 'react-markup'
import React, {PropTypes} from 'react'

import Page from './page'
import H1 from './h1'
import H2 from './h2'
import Text from './text'
import Checkbox from './checkbox'
import Group from './group'
import Tags from './tags'
import Textarea from './textarea'
import Row from './row'

const ItemTypes = {
    H1: 'h1',
    H2: 'h2',
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    GROUP: 'group',
    TAGS: 'tags',
    TEXTAREA: 'textarea',
    ROW: 'row',
}


class Root extends React.Component {

    handleChange = (path, value) => {
        this.props.onChange(path, value)
    }


    renderItem = (page, item, i) => {
        const {state} = this.props

        switch (item.type) {
            case ItemTypes.H1:
                return h(H1, {key: `item_${i}`, ...item})
            case ItemTypes.H2:
                return h(H2, {key: `item_${i}`, ...item})
            case ItemTypes.TEXT:
                return h(Text, {
                    ...item,
                    key: `item_${i}`,
                    value: state[page.name][item.name],
                    onChange: this.handleChange.bind(null, [page.name, item.name]),
                })
            case ItemTypes.CHECKBOX:
                return h(Checkbox, {
                    ...item,
                    key: `item_${i}`,
                    value: state[page.name][item.name],
                    onChange: this.handleChange.bind(null, [page.name, item.name]),
                })
            case ItemTypes.GROUP:
                return h(Group, {
                    ...item,
                    key: `item_${i}`,
                    value: state[page.name][item.name],
                    onChange: this.handleChange.bind(null, [page.name, item.name]),
                })
            case ItemTypes.TAGS:
                return h(Tags, {
                    ...item,
                    key: `item_${i}`,
                    value: state[page.name][item.name],
                    onChange: this.handleChange.bind(null, [page.name, item.name]),
                })
            case ItemTypes.TEXTAREA:
                return h(Textarea, {
                    ...item,
                    key: `item_${i}`,
                    value: state[page.name][item.name],
                    onChange: this.handleChange.bind(null, [page.name, item.name]),
                })
            case ItemTypes.ROW:
                return h(Row, {
                    key: `item_${i}`,
                }, item.content.map((child, i) => this.renderItem(page, child, i)))
            default:
                throw new Error('Unknown item type: ' + item.type)
        }
    }


    render() {
        const {settings, state} = this.props

        return h('div', settings.pages.map((page) => (
            h(Page, {
                key: page.name,
                state,
                value: state[page.name],
                condition: page.condition,
            }, page.items.map((item,i) => this.renderItem(page, item, i)))
        )))
    }
}

Root.propTypes = {
    settings: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default Root
