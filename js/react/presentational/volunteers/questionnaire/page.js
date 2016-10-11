import {h} from 'react-markup'
import React, {PropTypes} from 'react'

class Page extends React.Component {

    render() {
        return h('div', this.props.children)
    }
}

Page.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Page
