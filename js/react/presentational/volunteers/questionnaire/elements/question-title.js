import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

const bem = prefixer('questionnaire-question-title')

class QuestionTitle extends React.Component {
    render() {
        const {mandatory, children} = this.props
        return h(bem('div'),
            children,
            mandatory && h(bem('span#mandatory'), '*')
        )
    }
}

QuestionTitle.propTypes = {
    mandatory: PropTypes.bool,
}

QuestionTitle.defaultProps = {
    mandatory: false,
}

export default QuestionTitle
