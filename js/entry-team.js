require("is-nan").shim()

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
    /*
        Common donation logic
     */
    Array.prototype.slice.apply(document.querySelectorAll(".common-donation")).forEach((formDiv) => {
        const form = formDiv.querySelector(".common-donation_form")

        const tips = formDiv.querySelector(".common-donation_tips")
        const input = formDiv.querySelector(".common-donation_amount")
        const button = formDiv.querySelector(".common-donation_donate-button")

        const sumInput = form.querySelector("input[name=sum]")

        // Configure rendering
        const store = createStore(donationFormReducer)
        const render = () => {
            const {value, focused} = store.getState()

            // Calculate derived values
            const a = 0.005 // coefficient for PC payment type
            const amountDue = value - value * (a / (1 + a))
            const fee = value - amountDue

            // Update view
            input.value = value + (!focused ? " ₽" : "")
            button.disabled = !(value > 0)
            tips.innerText = `Будет переведено ${amountDue.toFixed(2)} ₽ (комиссия ${fee.toFixed(2)} ₽)`
            sumInput.value = value
        }
        store.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ["input", "focus", "blur"], store)
    })
})
