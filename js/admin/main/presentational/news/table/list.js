const COMPONENT_NAME = 'NewsTableList'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import Tag from '../tag'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    onSelect(id) {
        this.props.onSelect(id)
    },

    handleDelete(id, e) {
        e.stopPropagation()
        this.props.onDelete(id)
    },

    handleEdit(id, e) {
        e.stopPropagation()
        this.props.onEdit(id)
    },

    render() {
        const {items} = this.props
        return h(b('div'),
            h(b('div#items'),
                items.map(({id, title, published, active, tags}) => (
                    h(b('div#item' + (active ? '.active' : '') + (!published ? '.unpublished' : '')), {key: id, onClick: this.onSelect.bind(this, id)},
                        h(b('div#item-title'), title),
                        h(b('div#item-tags'), tags.map(({id, title}) => (
                            h(b('div#item-tag'), {key: id},
                                h(Tag, {title})
                            )
                        ))),
                        h(b('div#controls'),
                            h('button', {onClick: this.handleEdit.bind(this, id)}, 'Edit'),
                            h('button', {onClick: this.handleDelete.bind(this, id)}, 'Delete')
                        )
                    )
            )
        )))
    },
})
