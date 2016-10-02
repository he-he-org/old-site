require('is-nan').shim()
import Promise from 'promise-polyfill'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {h} from 'react-markup'

import {createStore} from '~/shared/redux-helpers'
import I18N from './i18n'

import {
    reducer as subscribeModalReducer,
    initialState as subscribeModalInitialState,
} from './react/reducers/subscribe-modal-reducer'
import SubscribePopup from '~/react/container/subscribe-popup'

// Subscribe form
new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', resolve)
}).then(() => {
    return I18N.create({
        'strings': [],
        'texts': [],
    })
}).then((i18n) => {
    // Init store for popup
    const initialState = {
        modal: subscribeModalInitialState.modal,
    }
    const popupStore = createStore(subscribeModalReducer, initialState)
    ReactDOM.render(
        h(Provider, {store: popupStore},
            h(SubscribePopup(i18n))
        ),
        document.querySelector('#react-subscribe-popup-entry')
    )
    Array.prototype.slice.apply(document.querySelectorAll('.layout-footer_subscribe-button')).forEach((button) => {
        button.addEventListener('click', () => {
            popupStore.dispatch({
                type: 'SET_MODAL_DISPLAYED',
                displayed: true,
            })
        })
    })
})
