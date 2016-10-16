import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-h2')

class H2 extends React.Component {

    render() {
        return h(bem('div'), this.props.content)
    }
}

H2.propTypes = {
    content: PropTypes.string.isRequired,
}

export default H2
