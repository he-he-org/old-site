const COMPONENT_NAME = 'Tag'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    render() {
        const {title} = this.props
        return h(b('div'), title)
    },
})
