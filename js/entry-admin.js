require('is-nan').shim()

import ReactDOM from 'react-dom'
import {h} from 'react-markup'

import App from './admin/main/app'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(h(App), document.getElementById('react'))
})
