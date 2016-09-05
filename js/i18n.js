import Promise from 'promise-polyfill'
import {
    LanguageType,
} from './shared/definitions'


const I18N = class {
    constructor(data) {
        this.data = data
    }

    static create(params = {}) {
        const extParams = {
            ...params,
            language: I18N.detectLanguage(),
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.addEventListener('load', () => {
                const ST_OK = 200
                if (xhr.status === ST_OK) {
                    resolve(new I18N(JSON.parse(xhr.responseText)))
                }
                else {
                    reject(xhr.responseText)
                }
            })
            xhr.addEventListener('error', () => {
                reject(xhr.responseText)
            })
            xhr.open('POST', '/translations')
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(JSON.stringify(extParams))
        })
    }

    static detectLanguage() {
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

    detectLanguage() {
        return I18N.detectLanguage()
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
export default I18N

