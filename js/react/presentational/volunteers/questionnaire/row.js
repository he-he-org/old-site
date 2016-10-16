import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-row')

class Row extends React.Component {
    render() {
        return h(bem('div'), this.props.children)
    }
}

Row.propTypes = {
}

export default Row
