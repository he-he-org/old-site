import {createClass} from "react"
import {h} from "react-markup"
import {Router, Route, hashHistory} from "react-router"

import {merge} from "functional-utils"
import {login, logout, user} from "./api"
import Navigation from "./navigation"
import Auth from "./auth"
import TableView from "./table-view"
import DataAccess from "./data-access"

const Component = createClass({
    displayName: "App",

    getInitialState() {
        return {
            logined: false,
            dao: null,
        }
    },
    
    auth(username, password) {
        login(username, password).then(() => {
            return user()
        }).then((result) => {
            const {config} = this.props.route
            this.setState({
                logined: true,
                dao: DataAccess({
                    config,
                    api: {
                        basicAuth: {
                            username: result.accessToken,
                            password: "",
                        },
                    },
                }),
            })
        })
    },

    logout() {
        logout().then(() => {
            this.setState({
                logined: false,
                dao: null,
            })
        })
    },

    componentDidMount() {
        user().then((result) => {
            const {config} = this.props.route
            this.setState({
                logined: true,
                dao: DataAccess({
                    config,
                    api: {
                        basicAuth: {
                            username: result.accessToken,
                            password: "",
                        },
                    },
                }),
            })
        }).catch((e) => {
            console.error(e)
            //console.log("Unauthorized...", e)
        })
    },

    render() {
        const {config} = this.props.route
        const {scheme} = config
        const {logined, dao} = this.state
        const {params: {resource = "translation-strings"}} = this.props //todo: get first from scheme
        const activeResource = scheme.filter((x) => x.name === resource)[0]

        if (logined) {
            return h("div",
                h(Auth, {logined, onLogin: this.auth, onLogout: this.logout}),
                h(Navigation, {items: scheme, activeItem: activeResource}),
                h(TableView, {
                    resourceName: resource,
                    context: {
                        config,
                        dao,
                    },
                })
            )
        }
        else {
            return h("div",
                h(Auth, {logined, onLogin: this.auth})
            )
        }
    },
})

const App = createClass({
    render() {
        return h(Router, {history: hashHistory, config: this.props.config},
            h(Route, merge({path: "/:resource", component: Component}, this.props)),
            h(Route, merge({path: "/", component: Component}, this.props))
        )
    },
})

export default App
