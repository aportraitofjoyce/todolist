import {AUTH_ACTIONS_TYPES, AuthActionsType} from '../actions/auth-actions'

const initialState = {
    isLoggedIn: false,
}

type InitialStateType = {
    isLoggedIn: boolean
    id?: number
    email?: string
    login?: string
}

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_AUTH_DATA:
            return {...state, ...action.payload.data, isLoggedIn: true}

        default:
            return state
    }
}