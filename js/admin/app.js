import {createClass} from "react"
import {h} from "react-markup"
import {Router, Route, hashHistory} from "react-router"

import {merge} from "functional-utils"
import {login, logout, user} from "./api"
import Navigation from "./navigation"
import Auth from "./auth"
import TableView from "./table-view"
import DataAccess from "./data-access"


const deepMerge = (obj1, obj2) => {
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || Array.isArray(obj1) || Array.isArray(obj2)) { //todo: es6
        return obj2
    }

    const result = merge({}, obj1)

    Object.keys(obj2).forEach((key) => {
        if (key in obj1) {
            result[key] = deepMerge(obj1[key], obj2[key])
        }
        else {
            result[key] = obj2[key]
        }
    })

    return result
}

const normalizeConfig = (config) => {
    const {scheme, expandings, renderers} = config

    // todo: validate and normalize scheme
    // todo: validate and normalize expandings
    // todo: validate renderers

    // Normalize renderers
    let defaultRenderers = renderers
    scheme.forEach((resource) => {
        let table = {}
        resource.attrs.forEach((attr) => {

            let renderer = null
            if (attr.type === "manyToOne") {
                renderer = (value) => value === null ? "null" : "[" + value.id + "]"
            }
            else if (attr.type === "manyToMany") {
                renderer = (value) => value === null ? "null" : "[" + value.map((x) => x.id).join(", ") + "]"
            }
            else {
                renderer = (value) => value === null ? "null" : value
            }
            table = merge(table, {
                [attr.name]: renderer,
            })
        })
        defaultRenderers = merge(defaultRenderers, {
            [resource.name]: {
                table,
            },
        })
    })

    return merge(config, {
        renderers: deepMerge(defaultRenderers, renderers),
    })
}




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
        const {config} = this.props

        const normalizedConfig = normalizeConfig(config)

        return h(Router, {history: hashHistory},
            h(Route, {path: "/:resource", component: Component, config: normalizedConfig}),
            h(Route, {path: "/", component: Component, config: normalizedConfig})
        )
    },
})

export default App
