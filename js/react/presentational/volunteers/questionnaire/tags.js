import {h} from 'react-markup'
import React, {PropTypes} from 'react'

import QuestionTitle from './elements/question-title'

class Tags extends React.Component {

    handleChange = (e) => {
        const {onChange} = this.props
        onChange(e.target.value)
    }

    render() {
        const {name, title, value, mandatory} = this.props
        return h('div',
            h('label',
                h(QuestionTitle, {mandatory}, title),
                h('input', {type: 'text', name, value, onChange: this.handleChange})
            )
        )
    }
}

Tags.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mandatory: PropTypes.bool,
}

Tags.defaultProps = {
    mandatory: false,
}

export default Tags
