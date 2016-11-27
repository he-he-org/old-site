const COMPONENT_NAME = 'App'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import Auth from './presentational/auth'
import Navigation from './presentational/navigation'

import NewsTab from './containers/news-tab'
import TagsTab from './containers/tags-tab'

import Api, {login, user} from './../api'
import Dao from './dao'

const b = prefixer(COMPONENT_NAME)

const App = createClass({
    getInitialState() {
        return {
            route: '/news',
            logined: false,
            dataReady: false,
            dao: null,
            data: null,
            language: 'ru-RU',
        }
    },

    componentDidMount() {
        user().then((result) => {
            this.setState({
                logined: true,
                dao: Dao(
                    Api({
                        basicAuth: {
                            username: result.accessToken,
                            password: '',
                        },
                    })
                ),
            }, () => {
                this.refresh()
            })
        }).catch((e) => {
            console.error(e)
        })
    },

    refresh() {
        const {dao} = this.state
        this.setState({
            dataReady: false,
        }, () => {
            const newsItems = dao.newsItems()
            const tags = dao.tags()
            Promise
                .all([newsItems, tags])
                .then((responses) => responses.map(({data}) => data))
                .then(([newsItems, tags]) => {
                    this.setState({
                        dataReady: true,
                        data: {
                            newsItems,
                            tags,
                        },
                    })
                })
        })
    },

    navigate(route) {
        this.setState({
            route,
        })
    },

    auth(username, password) {
        login(username, password).then(() => {
            return user()
        }).then(() => {
            this.setState({
                logined: true,
            })
        })
    },

    handleCreateNewsItem(item) {
        const {dao} = this.state
        dao.newsItemCreate(item).then(() => {
            this.refresh()
        })
    },

    handleUpdateNewsItem(item) {
        const {dao} = this.state
        dao.newsItemUpdate(item).then(() => {
            this.refresh()
        })
    },

    handleDeleteNewsItem(id) {
        const {dao} = this.state
        dao.newsItemDelete(id).then(() => {
            this.refresh()
        })
    },

    handleCreateTag(tag) {
        const {dao} = this.state
        dao.tagCreate(tag).then(() => {
            this.refresh()
        })
    },

    handleDeleteTag(id) {
        const {dao} = this.state
        dao.tagDelete(id).then(() => {
            this.refresh()
        })
    },

    handleUpdateTag(tag) {
        const {dao} = this.state
        dao.tagUpdate(tag).then(() => {
            this.refresh()
        })
    },

    renderTab() {
        const {dataReady, route, data} = this.state
        if (!dataReady) {
            return h('div', 'Loading data...')
        }
        else if (route === '/news') {
            return h(NewsTab, {data,
                onCreateItem: this.handleCreateNewsItem,
                onUpdateItem: this.handleUpdateNewsItem,
                onDeleteItem: this.handleDeleteNewsItem,
            })
        }
        else if (route === '/tags') {
            return h(TagsTab, {
                data,
                onCreateTag: this.handleCreateTag,
                onDeleteTag: this.handleDeleteTag,
                onUpdateTag: this.handleUpdateTag,
            })
        }
        throw new Error(`Unknown route: "${route}"`)
    },

    render() {
        const {logined} = this.state
        if (logined) {
            return h(b('div'),
                h(Navigation, {
                    items: [
                        {title: 'News', path: '/news'},
                        {title: 'Tags', path: '/tags'},
                    ],
                    onNavigate: this.navigate,
                }),
                this.renderTab()
            )
            //
            //return h(b('div'),
            //    //h(Router, {history: hashHistory},
            //    //    h(Route, {path: '/', component: Root},
            //    //        h(IndexRedirect, {to: '/news'}),
            //    //        h(Route, {path: 'news', component: NewsTableTab}),
            //    //        h(Route, {path: 'tags', component: TagsTableTab, tags})
            //    //    )
            //    //)
            //)
        }
        else {
            return h(b('div'), h(Auth, {onSignIn: this.auth}))
        }
    },
})


export default App
