import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-h1')

class H1 extends React.Component {
    render() {
        return h(bem('div'), this.props.content)
    }
}

H1.propTypes = {
    content: PropTypes.string.isRequired,
}

export default H1
