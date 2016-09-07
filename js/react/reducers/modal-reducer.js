export const initialState = {
    displayed: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODAL_DISPLAYED': {
            return {
                ...state,
                displayed: action.displayed,
            }
        }
        default:
            return state
    }
}
