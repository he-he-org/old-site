import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-question-title')

class QuestionTitle extends React.Component {
    render() {
        return h(bem('div'), this.props.children)
    }
}

QuestionTitle.propTypes = {
}

export default QuestionTitle
