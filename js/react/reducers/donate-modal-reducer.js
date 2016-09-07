import {createStore, combineReducers} from 'redux'
import formReducer, {initialState as formInitialState} from './main-donation-form-reducer'
import modalReducer, {initialState as modalInitialState} from './modal-reducer'

export const reducer = combineReducers({
    form: formReducer,
    modal: modalReducer,
})

export const initialState = {
    form: formInitialState,
    modal: modalInitialState,
}

