import {AUTH_ACTIONS_TYPES, AuthActionsType} from '../actions/auth-actions'

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: AuthActionsType): typeof initialState => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.status}
        default:
            return state
    }
}