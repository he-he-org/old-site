import {h} from 'react-markup'
import React, {PropTypes} from 'react'
const {string, bool, arrayOf, shape, func} = PropTypes
import prefixer from 'bem-prefixer'

import QuestionTitle from './elements/question-title'

const bem = prefixer('questionnaire-radio')


class Radio extends React.Component {
    handleChange = (value) => {
        console.log("value", value)
        this.props.onChange(value)
    }

    render() {
        const {name, value, title, options} = this.props
        return h(bem('div'),
            h(QuestionTitle, title),
            h(bem('div#options'),
                options.map((option) => (
                    h(bem('button', 'input', option.value === value ? ['is-checked'] : []), {
                        key: option.value,
                        name, // todo: need to guarantee, that name is globaly unique, need to build full name including page name, or generate random name
                        value: option.value,
                        checked: option.value === value,
                        onClick: this.handleChange.bind(this, option.value),
                    }, option.title)
                ))
            )
        )
    }
}


Radio.propTypes = {
    name: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    options: arrayOf(shape({
        title: string.isRequired,
        value: string.isRequired,
    }).isRequired),
    onChange: func.isRequired,
    mandatory: bool,
}

Radio.defaultType = {
    mandatory: false,
}

export default Radio
