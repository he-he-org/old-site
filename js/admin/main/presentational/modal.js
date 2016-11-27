const COMPONENT_NAME = 'Modal'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    render() {
        return h(b('div'),
            h(b('div#body'),
                this.props.children
            )
        )
    },
})
