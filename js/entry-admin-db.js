require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'

import Root from './admin/db/root'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(h(Root), document.getElementById('react'))
})
