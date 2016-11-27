function formatDate(dt) {
    let date = dt.getDate()
    let month = dt.getMonth() + 1
    const year = dt.getFullYear()
    if (month < 10) { // eslint-disable-line no-magic-numbers
        month = '0' + month
    }
    if (date < 10) { // eslint-disable-line no-magic-numbers
        date = '0' + date
    }
    return `${year.toString()}-${month.toString()}-${date.toString()}`
}

const NEWS_ITEMS_SCHEME = {name: 'news-items'}
const TRANSLATION_STRINGS_SCHEME = {name: 'translation-strings'}
const TRANSLATION_TEXTS_SCHEME = {name: 'translation-texts'}
const NEWS_NEWS_TAGS_SCHEME = {name: 'news-news-tags'}
const TAGS_SCHEME = {name: 'news-tags'}

import {flushCache} from '~/admin/api'

export default function(api) {
    return {
        newsItems() {
            return api.fetchResource(NEWS_ITEMS_SCHEME, {
                expand: 'title,text,tags',
            })
        },
        newsItem(id) {
            return api.fetchRecord(NEWS_ITEMS_SCHEME, {
                id,
            }, {
                expand: 'title,text,tags',
            })
        },
        newsItemCreate(params) {
            const {
                title,
                text,
                published,
                date,
                tags,
                image,
                } = params

            return Promise
                .all([
                    api.postRecord(TRANSLATION_STRINGS_SCHEME, title),
                    api.postRecord(TRANSLATION_TEXTS_SCHEME, text),
                ])
                .then((responses) => responses.map((x) => x.entity))
                .then(([title, text]) => {
                    return api.postRecord(NEWS_ITEMS_SCHEME, {
                        date: formatDate(new Date(date)),
                        image_url: image,
                        published,
                        title_id: title.id,
                        text_id: text.id,
                    }).then((x) => x.entity)
                })
                .then((item) => {
                    // Add selected tags for record
                    const {id: itemId} = item
                    const tagsP = tags.map((tagId) => {
                        return api.postRecord(NEWS_NEWS_TAGS_SCHEME, {
                            news_id: itemId,
                            news_tags_id: tagId,
                        })
                    })
                    return Promise
                        .all(tagsP)
                        .then((response) => flushCache().then(() => response))
                })
        },

        newsItemDelete(id) {
            return api
                .deleteRecord(NEWS_ITEMS_SCHEME, {id})
                .then((response) => flushCache().then(() => response))
        },

        newsItemUpdate(params) {
            const {
                id,
                title,
                text,
                published,
                date,
                tags,
                image,
                } = params

            return api
                .patchRecord(NEWS_ITEMS_SCHEME, {
                    id,
                    date: formatDate(new Date(date)),
                    image_url: image,
                    published,
                })
                .then(() => this.newsItem(id)).then((x) => x.data)
                .then((item) => {
                    const textsP = Promise
                        .all([
                            api.patchRecord(TRANSLATION_STRINGS_SCHEME, {
                                id: item.title_id,
                                ...title,
                            }),
                            api.patchRecord(TRANSLATION_TEXTS_SCHEME, {
                                id: item.title_id,
                                ...text,
                            }),
                        ])

                    const newTags = tags.filter((tagId) => !item.tags.some(({id}) => id === tagId))
                    const deletedTags = item.tags.map(({id}) => id).filter((tagId) => !tags.some((id) => id === tagId))

                    const newTagsP = Promise.all(newTags.map((tagId) => {
                        return api.postRecord(NEWS_NEWS_TAGS_SCHEME, {
                            news_id: id,
                            news_tags_id: tagId,
                        })
                    }))

                    const deletedTagsP = Promise.all(deletedTags.map((tagId) => {
                        return api.fetchResource(NEWS_NEWS_TAGS_SCHEME, {
                            q: `news_id:${id};news_tags_id:${tagId}`,
                        }).then(({data}) => {
                            if (data.length > 0) { //todo: delete all records?
                                return api.deleteRecord(NEWS_NEWS_TAGS_SCHEME, {id: data[0].id})
                            }
                            return Promise.reject('Tag link record not found') //todo: always resolve
                        })
                    }))

                    return Promise
                        .all([textsP, newTagsP, deletedTagsP])
                        .then((response) => flushCache().then(() => response))
                })
        },

        tags() {
            return api.fetchResource(TAGS_SCHEME, {
                expand: 'title',
            })
        },

        tag(id) {
            return api.fetchRecord(TAGS_SCHEME, {
                id,
            }, {
                expand: 'title',
            })
        },

        tagCreate(tag) {
            const {
                title,
                } = tag

            return api
                .postRecord(TRANSLATION_STRINGS_SCHEME, title).then((response) => response.entity)
                .then((title) => {
                    return api.postRecord(TAGS_SCHEME, {
                        title_id: title.id,
                    }).then((x) => x.entity)
                })
                .then((response) => flushCache().then(() => response))
        },

        tagDelete(id) {
            return api
                .deleteRecord(TAGS_SCHEME, {id})
                .then((response) => flushCache().then(() => response))
        },

        tagUpdate(params) {
            const {
                id,
                title,
                } = params

            return this.tag(id)
                .then((x) => x.data)
                .then((tag) => {
                    return api.patchRecord(TRANSLATION_STRINGS_SCHEME, {
                        id: tag.title_id,
                        ...title,
                    })
                })
                .then((response) => flushCache().then(() => response))
        },
    }
}
