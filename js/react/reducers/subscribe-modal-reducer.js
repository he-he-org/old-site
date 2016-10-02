import {combineReducers} from 'redux'
import modalReducer, {initialState as modalInitialState} from './modal-reducer'

export const reducer = combineReducers({
    modal: modalReducer,
})

export const initialState = {
    modal: modalInitialState,
}
