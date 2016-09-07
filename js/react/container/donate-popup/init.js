require('is-nan').shim()

import {Component} from 'react'
import ReactDOM from 'react-dom'
import {h} from 'react-markup'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import formReducer, {initialState as formInitialState} from './main-donation-form-reducer'
import modalReducer, {initialState as modalInitialState} from './modal-reducer'
import Popup from './donate-popup'
import {reducer,initialState} from './donate-modal-reducer'

export default (i18n) => {
    const popupStore = createStore(reducer, initialState)
    ReactDOM.render(
        h(Provider, {store: popupStore},
            h(Popup(i18n))
        ),
        document.querySelector('#react-popup-entry')
    )
    return popupStore
}
