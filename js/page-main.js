import ReactDom from "react-dom"
import {createElement} from "react"

Array.prototype.slice.apply(document.querySelectorAll(".js-disabled"))
    .forEach((node) => node.parentNode.removeChild(node))

document.addEventListener("DOMContentLoaded", () => {
    ReactDom.render(
        createElement("h1", null, "Hello world"),
        document.getElementById("react-container")
    )
})
