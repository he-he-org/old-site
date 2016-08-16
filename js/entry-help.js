require("is-nan").shim()


import {merge} from "functional-utils"
import {createStore} from "redux"

const PC_A = 0.005
const AC_A = 0.02

const find = (...attrs) => {
    let context = null
    let selector = null

    if (attrs.length < 2) {
        context = document
        selector = attrs[0]
    }
    else {
        context = attrs[0]
        selector = attrs[1]
    }

    return Array.prototype.slice.apply(context.querySelectorAll(selector))
}

const get = (...attrs) => find(...attrs)[0]

const MAX_AMOUNT_LENGTH = 10

document.addEventListener("DOMContentLoaded", () => {
    find(".section-donate-form").forEach((form) => {
        const initialState = {
            paymentType: "AC",
            amountOption: "500",
            amount: 500,
        }

        const donationFormReducer = (state = initialState, action) => {
            switch (action.type) {
                case "SET_PAYMENT_TYPE": {
                    return merge(state, {paymentType: action.value})
                }
                case "SET_AMOUNT_OPTION": {
                    return merge(state, {
                        amountOption: action.value,
                        amount: action.value !== "free" ? parseInt(action.value, 10) : state.amount,
                    })
                }
                case "SET_AMOUNT": {
                    const number = Number(action.text)
                    if (action.text.length > MAX_AMOUNT_LENGTH || Number.isNaN(number)) {
                        return state
                    }
                    else {
                        return merge(state, {amount: Math.abs(Math.round(number))})
                    }
                }
                default: return state
            }
        }

        const store = createStore(donationFormReducer)
        const renderer = () => {
            const {paymentType, amountOption, amount} = store.getState()

            find(form, "[data-role=payment-options] .section-donate-form_option").forEach((option) => {
                if (option.getAttribute("data-value") === paymentType) {
                    option.classList.add("section-donate-form_option--active")
                }
                else {
                    option.classList.remove("section-donate-form_option--active")
                }
            })

            find(form, "[data-role=amount-options]  .section-donate-form_option").forEach((option) => {
                if (option.getAttribute("data-value") === amountOption) {
                    option.classList.add("section-donate-form_option--active")
                }
                else {
                    option.classList.remove("section-donate-form_option--active")
                }
            })

            if (amountOption !== "free") {
                get(form, ".section-donate-form_amount-input").classList.add("hidden")
                get(form, ".section-donate-form_amount").classList.remove("hidden")
            }
            else {
                get(form, ".section-donate-form_amount-input").classList.remove("hidden")
                get(form, ".section-donate-form_amount").classList.add("hidden")
            }
            get(form, ".section-donate-form_amount-input input").value = amount
            get(form, ".section-donate-form_amount").textContent = amount + " ₽"

            const amountDue = (paymentType === "PC")
                ? amount - amount * (PC_A / (1 + PC_A))
                : amount * (1 - AC_A)

            const fee = amount - amountDue


            get(form, "[data-role=fee-info]").textContent = get(form, "[data-role=fee-info-template]")
                .textContent
                .replace(/\{amount\}/g, amountDue.toFixed(2))
                .replace(/\{fee\}/g, fee.toFixed(2))

            get(form, "[data-role=submit]").disabled = amount === 0

            get(form, "[data-role=hidden-sum]").value = amount
            get(form, "[data-role=hidden-paymentType]").value = paymentType


            find(".section-donate-info").forEach((info) => {
                find(info, ".section-donate-info_block").forEach((div) => {
                    if (div.getAttribute("date-value") === amountOption) {
                        div.classList.remove("hidden")
                    }
                    else {
                        div.classList.add("hidden")

                        find(div, ".section-donate-info_desc-container").forEach((container) => {
                            // Show random description
                            const descs = find(container, ".section-donate-info_desc")
                            if (descs.length > 1) {
                                descs.forEach((desc) => desc.classList.add("hidden"))
                                descs[Math.floor(Math.random() * descs.length)].classList.remove("hidden")
                            }
                        })
                    }
                })
            })
        }
        renderer()
        store.subscribe(renderer)

        find(form, "[data-role=payment-options] .section-donate-form_option").forEach((option) => {
            option.addEventListener("click", () => {
                store.dispatch({type: "SET_PAYMENT_TYPE", value: option.getAttribute("data-value")})
            })
        })
        find(form, "[data-role=amount-options] .section-donate-form_option").forEach((option) => {
            option.addEventListener("click", () => {
                store.dispatch({type: "SET_AMOUNT_OPTION", value: option.getAttribute("data-value")})
            })
        })
        get(form, "[data-role=amount-input] input").addEventListener("input", (e) => {
            store.dispatch({type: "SET_AMOUNT", text: e.target.value})
        })
    })
})

// Left menu bar
const STICKY_MARGIN = 5

document.addEventListener("DOMContentLoaded", () => {
    Array.prototype.slice.apply(document.querySelectorAll(".category-menu")).forEach((menu) => {
        // Highlight current item
        const highlightItems = () => {
            Array.prototype.slice.apply(menu.querySelectorAll(".category-menu_item")).forEach((item) => {
                const url = new URL(item.getAttribute("href"), window.location)
                if (url.href === location.href) {
                    item.classList.add("category-menu_item--active")
                }
                else {
                    item.classList.remove("category-menu_item--active")
                }
            })
        }
        window.addEventListener("hashchange", highlightItems, false)
        highlightItems()

        // Make sticky menu
        const body = menu.querySelector(".category-menu_body")
        const checkSticky = () => {
            const bodyRect = document.body.getBoundingClientRect()
            const menuRect = menu.getBoundingClientRect()
            const pos = menuRect.top - bodyRect.top

            const bodyScroll = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop || 0

            const dif = Math.max(bodyScroll - pos + STICKY_MARGIN, 0)

            body.style.top = `${dif}px`
        }
        document.addEventListener("scroll", checkSticky)
        checkSticky()
    })
})
