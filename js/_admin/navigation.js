import {createClass} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"

import { Link } from 'react-router'

const bem = prefixer("Navigation")

const Navigation = createClass({

    render() {
        const {items, activeItem} = this.props

        return (
            h(bem("div"),
                items.map((item) => {
                    if (item.name === activeItem.name) {
                        return h(bem("div#item.active"),
                            {key: item.name},
                            item.name
                        )
                    }
                    else {
                        return h(Link, {key: item.name, to: `/${item.name}`},
                            h(bem("div#item"),
                                {key: item.name},
                                item.name
                            )
                        )
                    }
                })
            )
        )
    },
})

export default Navigation
