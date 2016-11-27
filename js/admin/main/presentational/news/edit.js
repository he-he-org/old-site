const COMPONENT_NAME = 'NewsEdit'

import {createClass} from 'react'
import {h} from 'react-markup'
import prefixer from 'bem-prefixer'

import LanguageSwitcher from '~/admin/main/presentational/language-switcher'
import Tag from './tag'

const b = prefixer(COMPONENT_NAME)

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

export default createClass({

    displayName: COMPONENT_NAME,

    getInitialState() {
        return {
            titleLang: 'en-US',
            textLang: 'en-US',
        }
    },

    renderSpaceRow() {
        return h(b('tr#space-row'),
            h('td'),
            h('td')
        )
    },

    renderTitle(title) {
        return h(b('tr#title-row'),
            h('td'),
            h('td', title)
        )
    },

    renderInput(modifiers, input) {
        return h(b('tr#input-row'),
            h(b('td#modifiers'), modifiers),
            h(b('td#input'), input)
        )
    },

    handleChangeTitleLang(lang) {
        this.setState({
            titleLang: lang,
        })
    },

    handleChangeTextLang(lang) {
        this.setState({
            textLang: lang,
        })
    },

    handleChangeTitle(e) {
        this.props.onChangeTitle(this.state.titleLang, e.target.value)
    },

    handleChangeText(e) {
        this.props.onChangeText(this.state.textLang, e.target.value)
    },

    handleChangePublished(e) {
        this.props.onChangePublished(e.target.checked)
    },

    handleChangeDate(e) {
        this.props.onChangeDate(Date.parse(e.target.value))
    },

    handleChangeImage(e) {
        this.props.onChangeImage(e.target.value)
    },

    handleChangeTag(tagId, e) {
        this.props.onChangeTags(tagId, e.target.checked)
    },

    render() {
        const {titleLang, textLang} = this.state
        const {availableTags, item} = this.props
        return h(b('div'),
            h(b('table#inputs'),
                h('tbody',
                    this.renderTitle('Title'),
                    this.renderInput(
                        h(LanguageSwitcher, {value: titleLang, onChange: this.handleChangeTitleLang}),
                        h(b('input#title-input'), {
                            value: item.title[titleLang],
                            onChange: this.handleChangeTitle,
                        })
                    ),
                    this.renderSpaceRow(),
                    this.renderInput(
                        h('input', {type: 'checkbox', checked: item.published, onChange: this.handleChangePublished}),
                        h('span', 'Published')
                    ),
                    this.renderSpaceRow(),
                    this.renderTitle('Date'),
                    this.renderInput(
                        null,
                        h(b('input#date-input'), {
                            type: 'date',
                            value: formatDate(new Date(item.date)),
                            onChange: this.handleChangeDate,
                        })
                    ),
                    this.renderSpaceRow(),
                    this.renderTitle('Image'),
                    this.renderInput(
                        null,
                        h(b('input#date-input'), {
                            value: item.image,
                            onChange: this.handleChangeImage,
                        })
                    ),
                    this.renderSpaceRow(),
                    this.renderTitle('Body'),
                    this.renderInput(
                        h(LanguageSwitcher, {active: textLang, onChange: this.handleChangeTextLang}),
                        h(b('textarea#body-input'), {
                            value: item.text[textLang],
                            onChange: this.handleChangeText,
                        })
                    ),
                    this.renderSpaceRow(),
                    this.renderTitle('Tags'),
                    this.renderInput(
                        null,
                        h(b('div#tags'), availableTags.map(({id, title}) => (
                            h(b('div#tag'), {key: id},
                                h('input', {
                                    type: 'checkbox',
                                    onClick: this.handleChangeTag.bind(this, id),
                                    onChange: this.handleChangeTag.bind(this, id),
                                    checked: item.tags.some((x) => x === id),
                                }),
                                h(Tag, {title})
                            )
                        )))
                    )
                )
            )
        )
    },
})
