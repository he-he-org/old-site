require('is-nan').shim()

import I18N from './i18n'
import Questionnaire from '~/react/container/volunteers/questionnaire'

new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve)
}).then(() => {
    return I18N.create({
        'strings': [
            'volunteers/quetaionnaire/submit-button/title',
        ],
        'texts': [
            'volunteers/questionnaire/settings',
            'volunteers/questionnaire/done-message',
        ],
    })
}).then((i18n) => {
    const questionnaire = document.getElementById('react-volunteers-questionnaire-entry-point')
    if (questionnaire) {
        const jsonString = i18n.t('texts', 'volunteers/questionnaire/settings')
        const data = JSON.parse(jsonString)
        Questionnaire(data, questionnaire, i18n)
    }
}).catch((e) => {
    console.error(e.stack)
})
