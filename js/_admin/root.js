import {createClass} from "react"
import {h} from "react-markup"
import rest from "rest"
import mime from "rest/interceptor/mime"
import {Router, Route, hashHistory} from "react-router"

import Navigation from "./navigation"
import TableView from "./table-view"

const App = createClass({
    getInitialState() {
        return {
            scheme: [
                {
                    name: "translation-strings",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "en-US", type: "string"},
                        {name: "es-ES", type: "string"},
                        {name: "ru-RU", type: "string"},
                    ],
                },
                {
                    name: "translation-texts",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "en-US", type: "text"},
                        {name: "es-ES", type: "text"},
                        {name: "ru-RU", type: "text"},
                    ],
                },
                {
                    name: "members",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "name", type: "manyToOne", manyToOne: {
                            to: "translation-strings",
                            fromAttr: "name_id",
                            toAttr: "id",
                        }},
                        {name: "role", type: "manyToOne", manyToOne: {
                            to: "translation-strings",
                            fromAttr: "role_id",
                            toAttr: "id",
                        }},
                        {name: "photo_url", type: "string"},
                        {name: "vk", type: "string"},
                        {name: "fb", type: "string"},
                        {name: "linked_in", type: "string"},
                        {name: "email", type: "string"},
                    ],
                },
                {
                    name: "news-items",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "date", type: "date"},
                        {name: "title", type: "manyToOne", manyToOne: {
                            to: "translation-strings",
                            fromAttr: "title_id",
                            toAttr: "id",
                        }},
                        {name: "text", type: "manyToOne", manyToOne: {
                            to: "translation-texts",
                            fromAttr: "text_id",
                            toAttr: "id",
                        }},
                        {name: "image_url", type: "string"},
                        {name: "tags", type: "manyToMany", manyToMany: {
                            via: "news-news-tags",
                            to: "news-tag",
                            fromAttr: "news_id",
                            toAttr: "news_tags_id",
                        }},
                    ],
                },
                {
                    name: "news-tags",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "title", type: "manyToOne", manyToOne: {
                            to: "translation-strings",
                            fromAttr: "title_id",
                            toAttr: "id",
                        }},
                        {name: "news", type: "manyToMany", manyToMany: {
                            via: "news-news-tags",
                            to: "news-item",
                            fromAttr: "news_tags_id",
                            toAttr: "news_id",
                        }},
                    ],
                },
                {
                    name: "news-news-tags",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "news_id", type: "int"},
                        {name: "newsItem", type: "manyToOne", manyToOne: {
                            to: "news-items",
                            fromAttr: "news_id",
                            toAttr: "id",
                        }},
                        {name: "tag", type: "manyToOne", manyToOne: {
                            to: "news-tags",
                            fromAttr: "news_tags_id",
                            toAttr: "id",
                        }},
                        {name: "news_tags_id", type: "int"},
                    ],
                },
            ],
        }
    },

    render() {
        const {params: {resource = "translation-strings"}} = this.props
        const {scheme, data} = this.state
        const activeResource = scheme.filter((x) => x.name === resource)[0]

        return h("div",
            h(Navigation, {items: scheme, activeItem: activeResource}),
            h(TableView, {
                scheme,
                resourceName: resource,
                data,
            })
        )
    },
})

const Root = createClass({
    render() {
        return h(Router, {history: hashHistory},
            h(Route, {path: "/:resource", component: App}),
            h(Route, {path: "/", component: App})
        )
    },
})

export default Root
