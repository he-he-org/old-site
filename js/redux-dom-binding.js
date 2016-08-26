const allEventTypes = ['input', 'focus', 'blur'] //todo: add support for all other events

const allTranslations = {}
allEventTypes.forEach((eventType) => {
    allTranslations[eventType] = (() => {
        switch (eventType) {
            case 'input':
                return (e) => ({type: 'DOM_INPUT', text: e.target.value})
            case 'focus':
                return (_e) => ({type: 'DOM_FOCUS'})
            case 'blur':
                return (_e) => ({type: 'DOM_BLUR'})
            default:
                throw new Error('Unsupported event: ' + eventType)
        }
    })()
})

const allEventBinders = {}
allEventTypes.forEach((eventType) => {
    const translation = allTranslations[eventType]
    allEventBinders[eventType] = (element, store) => {
        element.addEventListener(eventType, (e) => {
            store.dispatch(translation(e))
        })
    }
})

/**
 * Add event listeners for DOM elements, which translate DOM specified events to redux actions
 * @param {object|object[]} elements DOM targets to add event listeners, could be
 * a single DOM element, NodeList or an array
 * @param {string|string[]} events events to bind, could be a space-separated string or and array of strings
 * @param {object} store store for dispatch actions to
 * @returns {undefined}
 */
export const bindEvents = (elements, events, store) => {
    const eventsArray = (typeof events === 'string')
        ? events.split(' ')
        : events //todo: check for other types

    const elementsArray = ('length' in elements) ? Array.prototype.slice.apply(elements) : [elements]

    elementsArray.forEach((element) => {
        eventsArray.forEach((eventType) => {
            if (!(eventType in allEventBinders)) {
                throw new Error('Undefined event type: ' + eventType)
            }
            const binder = allEventBinders[eventType]
            binder(element, store)
        })
    })
}
