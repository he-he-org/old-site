import {h} from 'react-markup'
import React, {PropTypes} from 'react'

class Text extends React.Component {

    handleChange = (e) => {
        const {onChange} = this.props
        onChange(e.target.value)
    }

    render() {
        const {name, title, value} = this.props
        return h('div',
            h('label',
                h('span', title),
                h('input', {type: 'text', name, value, onChange: this.handleChange})
            )
        )
    }
}

Text.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    mandatory: PropTypes.bool,
}

Text.defaultType = {
    mandatory: false,
}

export default Text
