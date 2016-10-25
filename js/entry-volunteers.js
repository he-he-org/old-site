require('is-nan').shim()

import I18N from './i18n'
import Questionnaire from '~/react/container/volunteers/questionnaire'

new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve)
}).then(() => {
    return I18N.create({
        'strings': [],
        'texts': [
            'help/volunteers/questionnaire/settings',
        ],
    })
}).then((i18n) => {
    const jsonString = i18n.t('texts', 'help/volunteers/questionnaire/settings')
    const data = JSON.parse(jsonString)
    Questionnaire(data, i18n)
}).catch((e) => {
    console.error(e.stack)
})
