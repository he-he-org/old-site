import ReactDom from "react-dom"
import {createElement} from "react"

Array.prototype.slice.apply(document.querySelectorAll(".js-disabled"))
    .forEach((node) => node.parentNode.removeChild(node))
