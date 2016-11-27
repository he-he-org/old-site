const COMPONENT_NAME = 'TagsTable'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    handleDelete(id) {
        this.props.onDelete(id)
    },
    handleEdit(id) {
        this.props.onEdit(id)
    },
    render() {
        const languages = ['ru-RU', 'en-US', 'es-ES']
        const {tags} = this.props
        return h(b('div'),
            h(b('div#controls'),
                h('button', {onClick: this.props.onCreate}, 'Create')
            ),
            h(b('table#table'),
                h(b('thead'),
                    h('tr', languages.map((lang) => (
                        h('th', {key: lang}, lang)
                    )))
                ),
                h(b('tbody'), tags.map(({id, title}) => (
                    h(b('tr#tag-row'), {key: id},
                        languages.map((lang) => (
                            h(b('td#title-cell'), {key: lang},
                                h('div', title[lang])
                            )
                        )).concat([
                            h(b('td#controls-cell'), {key: 'controls'},
                                h('button', {onClick: this.handleEdit.bind(this, id)}, 'Edit'),
                                h('button', {onClick: this.handleDelete.bind(this, id)}, 'Delete')
                            ),
                        ])
                    )
                )))
            )
        )
    },
})
