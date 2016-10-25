import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-p')

class P extends React.Component {

    render() {
        return h(bem('div'), this.props.content)
    }
}

P.propTypes = {
    content: PropTypes.string.isRequired,
}

export default P
