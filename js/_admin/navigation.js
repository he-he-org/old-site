import {createClass} from "react"
import {h} from "react-markup"
import prefixer from "bem-prefixer"

const bem = prefixer("Navigation")

const Navigation = createClass({

    select(item) {
        this.props.onSelect(item)
    },

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
                        return h(bem("div#item"),
                            {key: item.name, onClick: this.select.bind(this, item)},
                            item.name
                        )
                    }
                })
            )
        )
    },
})

export default Navigation
