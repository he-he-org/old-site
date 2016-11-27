const COMPONENT_NAME = 'TagsEdit'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'


const b = prefixer(COMPONENT_NAME)

export default createClass({

    displayName: COMPONENT_NAME,

    handleChangeTitle(lang, e) {
        this.props.onChangeTitle(lang, e.target.value)
    },

    render() {
        const {tag: {title}} = this.props
        return h(b('div'),
            h(b('div#inputs'),
                h(b('label#input-group'),
                    h(b('div#label'), 'Russian'),
                    h(b('input#input'), {value: title['ru-RU'], onChange: this.handleChangeTitle.bind(this, 'ru-RU')})
                ),
                h(b('label#input-group'),
                    h(b('div#label'), 'English'),
                    h(b('input#input'), {value: title['en-US'], onChange: this.handleChangeTitle.bind(this, 'en-US')})
                ),
                h(b('label#input-group'),
                    h(b('div#label'), 'Spanish'),
                    h(b('input#input'), {value: title['es-ES'], onChange: this.handleChangeTitle.bind(this, 'es-ES')})
                )
            )
        )
    },
})
