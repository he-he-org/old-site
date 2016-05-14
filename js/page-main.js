import {createStore} from "redux"
import {bindEvents} from "./redux-dom-binding"
import {merge} from "functional-utils"

const initialState = {
    value: 1000,
    focused: false,
}

const donationFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DOM_FOCUS": {
            return merge(state, {focused: true})
        }
        case "DOM_BLUR": {
            return merge(state, {focused: false})
        }
        case "DOM_INPUT": {
            const number = Number(action.text)
            if (Number.isNaN(number)) {
                return state
            }
            else {
                return merge(state, {value: number})
            }
        }
        default: return state
    }
}

document.addEventListener("DOMContentLoaded", () => {


    Array.from(document.querySelectorAll(".common-donation")).forEach((form) => {
        const input = form.querySelectorAll(".common-donation_amount")[0]
        const button = form.querySelectorAll(".common-donation_donate-button")[0]

        // Configure rendering
        const store = createStore(donationFormReducer)
        const render = () => {
            const {value, focused} = store.getState()
            if (focused) {
                input.value = value
            }
            else {
                input.value = value + " ₽"
            }
            button.disabled = !(value > 0)
        }
        store.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ["input", "focus", "blur"], store)
    })
})
