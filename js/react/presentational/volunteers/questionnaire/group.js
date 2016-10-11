import {h} from 'react-markup'
import React, {PropTypes} from 'react'

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
        const {from, to, value, onChange} = this.props
        return h('table',
            h('tbody', this.props.items.map((item) => (
                h('tr', {key: item.name},
                    h('td', item.title),
                    h('td',
                        h('input', {
                            type: 'range',
                            min: from,
                            max: to,
                            value: value[item.name],
                            onChange: this.handleChange.bind(null, item.name)
                        })
                    ),
                    h('td', value[item.name])
                )
            )))
        )
    }
}


GroupScale.propTypes = {
    name: string.isRequired,
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
        const {value} = this.props
        return h('table',
            h('thead',
                h('tr',
                    [
                        h('th', {key: 'title'}, ''),
                    ].concat(this.props.options.map((option) => (
                        h('th', {key: option.name}, option.title)
                    )))
                )
            ),
            h('tbody', this.props.items.map((item) => (
                h('tr', {key: item.name},
                    [
                        h('td', {key: 'title'}, item.title),
                    ].concat(this.props.options.map((option) => (
                        h('td', {key: option.name},
                            h('input', {
                                type: 'checkbox',
                                checked: value[item.name][option.name],
                                onClick: this.handleChange.bind(this, item.name, option.name)
                            })
                        )
                    )))
                )
            )))
        )
    }
}


GroupCheckbox.propTypes = {
    name: string.isRequired,
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
