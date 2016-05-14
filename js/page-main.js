import {createStore} from "redux"

const initialState = {
    value: 1000,
    focused: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOCUS": {
            return Object.assign({}, state, {
                focused: true,
            })
        }
        case "BLUR": {
            return Object.assign({}, state, {
                focused: false,
            })
        }
        case "INPUT": {
            const number = Number(action.text);
            if (!Number.isNaN(number)) {
                return Object.assign({}, state, {
                    value: number,
                })
            }
        }
    }
    return state
}

const store = createStore(reducer)

document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelectorAll(".common-donation_amount")[0]

    store.subscribe(() => {
        const {value, focused} = store.getState();
        if (focused) {
            input.value = value
        }
        else {
            input.value = value + " ₽"
        }
    })

    input.addEventListener("input", (e) => {
        store.dispatch({
            type: "INPUT",
            text: e.target.value,
        })
    })

    input.addEventListener("focus", (_e) => {
        store.dispatch({
            type: "FOCUS",
        })
    })

    input.addEventListener("blur", (_e) => {
        store.dispatch({
            type: "BLUR",
        })
    })
})
