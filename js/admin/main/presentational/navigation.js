const COMPONENT_NAME = 'Navigation'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    defaultProps: {
        active: 'news',
    },
    render() {
        const {active, items} = this.props
        return h(b('div'),
            items.map(({title, path}) => (
                h(b('div#item' + (title === active ? '.active' : '')), {key: path},
                    h('a', {href: `#${path}`, onClick: this.props.onNavigate.bind(null, path)}, title)
                )
            ))
        )
    },
})
