import {createClass} from "react"
import {h} from "react-markup"
import rest from "rest"
import mime from "rest/interceptor/mime"
import {fetchCollection} from "./api"

import Navigation from "./navigation"
import TableView from "./table-view"

const client = rest.wrap(mime)

const Root = createClass({
    getInitialState() {
        return {
            scheme: [
                {
                    name: "translation-string",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "en-US", type: "string"},
                        {name: "es-ES", type: "string"},
                        {name: "ru-RU", type: "string"},
                    ],
                },
                {
                    name: "translation-text",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "en-US", type: "text"},
                        {name: "es-ES", type: "text"},
                        {name: "ru-RU", type: "text"},
                    ],
                },
                {
                    name: "member",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "name_id", type: "int"},
                        //{name: "name", type: "manyToOne", manyToOne: {
                        //    fromAttr: "name_id",
                        //    toAttr: "id",
                        //    toResource: "translation-string",
                        //}},
                        {name: "role_id", type: "int"},
                        {name: "photo_url", type: "string"},
                        {name: "vk", type: "string"},
                        {name: "fb", type: "string"},
                        {name: "linked_in", type: "string"},
                        {name: "email", type: "string"},
                    ],
                },
                {
                    name: "news-item",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "date", type: "date"},
                        {name: "title_id", type: "int"},
                        {name: "text_id", type: "int"},
                        {name: "image_url", type: "string"},
                    ],
                },
                {
                    name: "news-tag",
                    attrs: [
                        {name: "id", type: "int"},
                        {name: "title_id", type: "int"},
                    ],
                },
            ],
            activeCollectionName: "translation-string",
        }
    },

    selectCollection(item) {
        this.setState({
            activeCollectionName: item.name,
        })
    },

    render() {
        const {scheme, data, activeCollectionName} = this.state
        const activeCollection = scheme.filter((x) => x.name === activeCollectionName)[0]
        return h("div",
            h(Navigation, {items: scheme, activeItem: activeCollection, onSelect: this.selectCollection}),
            h(TableView, {
                scheme: activeCollection,
                data,
            })
        )
    },
})

export default Root
