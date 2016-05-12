Array.prototype.slice.apply(document.querySelectorAll(".js-disabled"))
    .forEach((node) => node.parentNode.removeChild(node))

let value = 1000

Array.prototype.slice.apply(document.querySelectorAll(".common-donation_amount")).forEach((input) => {

    const button = Array.prototype.slice.apply(document.querySelectorAll(".common-donation_donate-button"))[0];

    input.addEventListener("focus", (_e) => {
        input.value = value
    })
    input.addEventListener("input", (e) => {
        const newValue = Number(e.target.value)
        if (!Number.isNaN(newValue)) { //todo: need polyfill?
            value = newValue
        }
        input.value = value | 0
        button.disabled = value <= 0
    })
    input.addEventListener("blur", (_e) => {
        input.value = value + " ₽"
    })
})