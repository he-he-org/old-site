import {h} from 'react-markup'
import React, {PropTypes} from 'react'

class Checkbox extends React.Component {
    handleChange = (e) => {
        this.props.onChange(e.target.checked)
    }

    render() {
        const {name, value, title} = this.props
        return h('div',
            h('label',
                h('input', {type: 'checkbox', name, checked: value, onClick: this.handleChange}),
                h('span', title)
            )
        )
    }
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    mandatory: PropTypes.bool,
}

Checkbox.defaultType = {
    mandatory: false,
}

export default Checkbox
