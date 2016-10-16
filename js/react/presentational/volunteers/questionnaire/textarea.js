import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

import QuestionTitle from './elements/question-title'

const bem = prefixer('questionnaire-textarea')

class Textarea extends React.Component {

    handleChange = (e) => {
        const {onChange} = this.props
        onChange(e.target.value)
    }

    render() {
        const {name, title, value} = this.props
        return h(bem('div'),
            h(bem('label#label'),
                h(QuestionTitle, title),
                h(bem('textarea#input'), {name, value, onChange: this.handleChange})
            )
        )
    }
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mandatory: PropTypes.bool,
}

Textarea.defaultType = {
    mandatory: false,
}

export default Textarea
