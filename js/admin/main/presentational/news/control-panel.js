const COMPONENT_NAME = 'ControlPanel'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'
import LanguageSwitcher from '~/admin/main/presentational/language-switcher'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,

    render() {
        return h(b('div'),
            h('button', {onClick: this.props.onCreate}, 'Create'),
            h(LanguageSwitcher, {onChange: this.props.onChangeLanguage, value: this.props.language})
        )
    },
})
