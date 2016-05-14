import {createStore} from "redux"
import {bindEvents} from "./redux-dom-binding"
import {merge} from "functional-utils"

const initialState = {
    value: 1000,
    focused: false,
    paymentType: "PC",
}

const PC_COEFFICIENT = 0.005
const AC_COEFFICIENT = 0.002

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


    Array.from(document.querySelectorAll(".common-donation")).forEach((formDiv) => {
        const form = formDiv.querySelector(".common-donation_form")

        const tips = formDiv.querySelector(".common-donation_tips")
        const input = formDiv.querySelector(".common-donation_amount")
        const button = formDiv.querySelector(".common-donation_donate-button")

        const aInput = form.querySelector("input[name=a]")
        const sumInput = form.querySelector("input[name=sum]")
        const amountDueInput = form.querySelector("input[name=amount_due]")

        // Configure rendering
        const store = createStore(donationFormReducer)
        const render = () => {
            const {value, focused, paymentType} = store.getState()

            if (paymentType === "MC") {
                throw new Error("MC payment type is not supported yet")
            }

            if (focused) {
                input.value = value
            }
            else {
                input.value = value + " ₽"
            }
            button.disabled = !(value > 0)

            const a = paymentType === "PC" ? PC_COEFFICIENT : AC_COEFFICIENT
            const amountDue = Math.round((value - value * (a / (1 + a))) * 100) / 100
            const fee = Math.round((value - amountDue) * 100) / 100

            tips.innerText = `Будет переведено ${amountDue} ₽ (комиссия ${fee} ₽)`
            sumInput.value = value
        }
        store.subscribe(render)
        render()

        // Bind some events to store dispatching
        bindEvents(input, ["input", "focus", "blur"], store)
    })
})
