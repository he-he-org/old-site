const COMPONENT_NAME = 'NewsTableCurrent'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'
import ReactMarkdown from 'react-markdown'
const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    render() {
        const {title, text, image} = this.props
        return h(b('div'),
            h(b('div#title'), title),
            h(b('img#image'), {src: image}),
            h(b('div#body'),
                h(ReactMarkdown, {escapeHtml: true, source: text})
            )
        )
    },
})
