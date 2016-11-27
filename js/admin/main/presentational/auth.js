const COMPONENT_NAME = 'Auth'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

const b = prefixer(COMPONENT_NAME)

export default createClass({
    displayName: COMPONENT_NAME,
    onSubmit(e) {
        e.preventDefault()
        this.props.onSignIn(this.username.value, this.password.value)
    },

    render() {
        return h(b('form'), {onSubmit: this.onSubmit},
            h('label',
                h('div', 'Login'),
                h('input', {ref: (el) => { this.username = el }})
            ),
            h('label',
                h('div', 'Password'),
                h('input', {type: 'password', ref: (el) => { this.password = el }})
            ),
            h('label',
                h('button', {type: 'submit'}, 'Sign in')
            )
        )
    },
})
