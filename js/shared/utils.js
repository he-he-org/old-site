import {
    LanguageType,
} from './definitions'

export const detectLanguage = () => {
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
