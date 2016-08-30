import {
    LanguageType,
} from './shared/definitions'


const I18N = class {
    constructor(data) {
        this.data = data
    }

    static create(params = {}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
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
            xhr.send(JSON.stringify(params))
        })
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
};
export default I18N

