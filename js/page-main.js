import ReactDom from "react-dom"
import {createElement} from "react"

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        createElement("h1", null, "Hello world"),
        document.getElementById("react-container")
    )
})
