import {h} from 'react-markup'
import React, {PropTypes} from 'react'
import prefixer from 'bem-prefixer'

import QuestionTitle from './elements/question-title'

const {string, number, object, func, bool, arrayOf, shape} = PropTypes

class GroupScale extends React.Component {

    handleChange = (name, e) => {
        const {value, onChange} = this.props
        onChange({
            ...value,
            [name]: parseInt(e.target.value, 10),
        })
    }

    render() {
        const bem = prefixer('questionnaire-group-scale')
        const {from, to, value, title} = this.props
        return h(bem('div'),
            h(QuestionTitle, title),
            h(bem('table#items'),
                h('tbody', this.props.items.map((item) => (
                    h(bem('tr#item'), {key: item.name},
                        h(bem('td#item-title'), item.title),
                        h(bem('td#item-range'),
                            h(bem('input#input'), {
                                type: 'range',
                                min: from,
                                max: to,
                                value: value[item.name],
                                onChange: this.handleChange.bind(null, item.name),
                            })
                        )
                    )
                )))
            )
        )
    }
}


GroupScale.propTypes = {
    name: string.isRequired,
    title: string.isRequired,
    from: number.isRequired,
    to: number.isRequired,
    items: arrayOf(shape({
        title: string.isRequired,
        name: string.isRequired,
    }).isRequired),
    value: object.isRequired,
    onChange: func.isRequired,
    mandatory: bool,
}


class GroupCheckbox extends React.Component {

    handleChange = (itemName, optionName, e) => {
        const {value, onChange} = this.props
        const checked = e.target.checked
        onChange({
            ...value,
            [itemName]: {
                ...value[itemName],
                [optionName]: checked,
            },
        })
    }

    render() {
        const bem = prefixer('questionnaire-group-checkbox')
        const {value, title} = this.props
        return h(bem('div'),
            h(QuestionTitle, title),
            h(bem('table#items'),
                h('thead'),
                h('tbody', this.props.items.map((item) => (
                    h(bem('tr#item'), {key: item.name},
                        [
                            h(bem('td#item-title'), {key: 'title'}, item.title),
                        ].concat(this.props.options.map((option) => (
                            h(bem('td#item-option'), {key: option.name},
                                h(bem('label#label'),
                                    h(bem('input#input'), {
                                        type: 'checkbox',
                                        checked: value[item.name][option.name],
                                        onClick: this.handleChange.bind(this, item.name, option.name),
                                    }),
                                    option.title
                                )
                            )
                        )))
                    )
                )))
            )
        )
    }
}


GroupCheckbox.propTypes = {
    name: string.isRequired,
    title: string.isRequired,
    options: arrayOf(shape({
        title: string.isRequired,
        name: string.isRequired,
    }).isRequired),
    items: arrayOf(shape({
        title: string.isRequired,
        name: string.isRequired,
    }).isRequired),
    value: object.isRequired,
    onChange: func.isRequired,
    mandatory: bool,
}

class Group extends React.Component {
    render() {
        const {subtype} = this.props
        if (subtype === 'scale') {
            return h(GroupScale, this.props)
        }
        else if (subtype === 'checkbox') {
            return h(GroupCheckbox, this.props)
        }
        else {
            throw new Error(`Group type ${subtype} is not supported yet`)
        }
    }
}

Group.propTypes = {
    name: string.isRequired,
    subtype: string.isRequired,
    value: object.isRequired,
    title: string.isRequired,
    onChange: func.isRequired,
    mandatory: bool,
}

Group.defaultType = {
    mandatory: false,
}

export default Group
