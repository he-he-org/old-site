const COMPONENT_NAME = 'NewsTable'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import List from './list'
import Current from './current'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    render() {
        const {items, current, onSelect, onDelete, onEdit} = this.props
        return h(b('div'),
            h(b('div#left'), h(List, {items, onSelect, onDelete, onEdit})),
            h(b('div#right'),
                current !== null
                ? h(Current, current)
                : h('div', '')
            )
        )
    },
})
