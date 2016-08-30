import {
    LanguageType,
} from './shared/definitions'


export default class {
    constructor() {
        if (!('i18n' in window)) {
            throw new Error('I18n isn`t initialized correctly')
        }
        this.data = window.i18n
    }

    detectLanguage() {
        if (/^(\/en$)|(\/en\/)/.test(window.location.pathname)) {
            return LanguageType.EN
        }
        else if (/^(\/es$)|(\/es\/)/.test(window.location.pathname)) {
            return LanguageType.ES
        }
        else {
            return LanguageType.RU
        }
    }

    t(cat, key) {
        const catData = this.data[cat]
        if (typeof catData === 'undefined') {
            throw new Error(`Wrong category ${cat}`)
        }
        if (!(key in catData)) {
            throw new Error(`Wrong key: ${cat}/${key}`)
        }
        return catData[key]
    }

    param(name, def) {
        if (this.params[name]) {
            return this.params[name]
        }
        return def
    }
}

