import {createClass} from 'react'
import {h} from 'react-markup'

import App from './app'

const scheme = [
    {
        name: 'translation-strings',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'en-US', type: 'string'},
            {name: 'es-ES', type: 'string'},
            {name: 'ru-RU', type: 'string'},
        ],
    },
    {
        name: 'translation-texts',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'scope', type: 'string'},
            {name: 'format', type: 'enum', options: ['plain', 'markdown']},
            {name: 'en-US', type: 'text'},
            {name: 'es-ES', type: 'text'},
            {name: 'ru-RU', type: 'text'},
        ],
    },
    {
        name: 'members',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'manyToOne', manyToOne: {
                to: 'translation-strings',
                fromAttr: 'name_id',
                toAttr: 'id',
            }},
            {name: 'role', type: 'manyToOne', manyToOne: {
                to: 'translation-strings',
                fromAttr: 'role_id',
                toAttr: 'id',
            }},
            {name: 'photo_url', type: 'string'},
            {name: 'vk', type: 'string'},
            {name: 'fb', type: 'string'},
            {name: 'linked_in', type: 'string'},
            {name: 'email', type: 'string'},
        ],
    },
    {
        name: 'news-items',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'date', type: 'date'},
            {name: 'title', type: 'manyToOne', manyToOne: {
                to: 'translation-strings',
                fromAttr: 'title_id',
                toAttr: 'id',
            }},
            {name: 'text', type: 'manyToOne', manyToOne: {
                to: 'translation-texts',
                fromAttr: 'text_id',
                toAttr: 'id',
            }},
            {name: 'image_url', type: 'string'},
            {name: 'tags', type: 'manyToMany', manyToMany: {
                via: 'news-news-tags',
                to: 'news-tags',
                fromAttr: 'news_id',
                toAttr: 'news_tags_id',
            }},
        ],
    },
    {
        name: 'news-tags',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'title', type: 'manyToOne', manyToOne: {
                to: 'translation-strings',
                fromAttr: 'title_id',
                toAttr: 'id',
            }},
            {name: 'news', type: 'manyToMany', manyToMany: {
                via: 'news-news-tags',
                to: 'news-items',
                fromAttr: 'news_tags_id',
                toAttr: 'news_id',
            }},
        ],
    },
    {
        name: 'news-news-tags',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'news_id', type: 'int'},
            {name: 'news_item', type: 'manyToOne', manyToOne: {
                to: 'news-items',
                fromAttr: 'news_id',
                toAttr: 'id',
            }},
            {name: 'tag', type: 'manyToOne', manyToOne: {
                to: 'news-tags',
                fromAttr: 'news_tags_id',
                toAttr: 'id',
            }},
            {name: 'news_tags_id', type: 'int'},
        ],
    },
    {
        name: 'vacancies',
        attrs: [
            {name: 'id', type: 'int'},
            {name: 'title', type: 'manyToOne', manyToOne: {
                to: 'translation-strings',
                fromAttr: 'title_id',
                toAttr: 'id',
            }},
            {name: 'body', type: 'manyToOne', manyToOne: {
                to: 'translation-texts',
                fromAttr: 'body_id',
                toAttr: 'id',
            }},
        ],
    },
]

const expandings = {
    'translation-strings': [],
    'translation-texts': [],
    'members': [
        'name',
        'role',
    ],
    'news-tags': [
        'title',
        ['news', [
            'title',
            'text',
        ]],
    ],
    'news-items': [
        'title',
        'text',
        ['tags', [
            'title',
        ]],
    ],
    'news-news-tags': [
        ['news_item', [
            'title',
            'text',
        ]],
        ['tag', [
            'title',
        ]],
    ],
    'vacancies': ['title', 'body'],
}

const renderers = {
    'members': {
        'name': (value) => value === null ? 'null' : value['ru-RU'],
        'role': (value) => value === null ? 'null' : value['ru-RU'],
    },
    'news-items': {
        'title': (value) => value === null ? 'null' : value['ru-RU'],
        'text': (value) => value === null ? 'null' : value['ru-RU'],
        'tags': (tags) => tags === null ? 'null' : tags.map((x) => x.title['ru-RU']).join(', '),
    },
    'news-tags': {
        'title': (value) => value === null ? 'null' : value['ru-RU'],
        'news': (tags) => tags === null ? 'null' : tags.map((x) => x.title['ru-RU']).join(', '),
    },
    'news-news-tags': {
        'news_item': (value) => value === null ? 'null' : value.title['ru-RU'],
        'tag': (value) => value === null ? 'null' : value.title['ru-RU'],
    },
    'vacancies': {
        'title': (value) => value === null ? 'null' : value['ru-RU'],
        'body': (value) => value === null ? 'null' : value['ru-RU'],
    },
}

const config = {
    scheme,
    expandings,
    renderers,
}

const Root = createClass({
    render() {
        return h(App, {config})
    },
})

export default Root
