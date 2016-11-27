const COMPONENT_NAME = 'LanguageSwitcher'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    handleChange(lang) {
        this.props.onChange(lang)
    },

    render() {
        const items = [
            {title: 'en', value: 'en-US'},
            {title: 'ru', value: 'ru-RU'},
            {title: 'es', value: 'es-ES'},
        ]

        return h(b('div'), items.map(({title, value}) => (
            h(b('div#item' + (value === this.props.value ? '.active' : '')), {
                key: value,
                onClick: this.handleChange.bind(this, value),
            },
                title
            )
        )))
    },
})
