import {createClass} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"

const bem = prefixer("Auth")

const Auth = createClass({
    displayName: "Auth",

    auth(e) {
        e.preventDefault()
        this.props.onLogin(this.usernameEl.value, this.passwordEl.value)
    },

    logout() {
        this.props.onLogout()
    },

    render() {
        const {logined} = this.props
        return (
            h(bem("div"),
                logined
                ? h("div",
                    h("span", "Authorized"),
                    h("button", {onClick: this.logout}, "Logout")
                )
                : h("form", {onSubmit: this.auth},
                    h("input", {ref: (el) => { this.usernameEl = el }, placeholder: "username"}),
                    h("input", {ref: (el) => { this.passwordEl = el }, placeholder: "password"}),
                    h("button", {type: "submit"}, "auth")
                )
            )
        )
    },
})

export default Auth
