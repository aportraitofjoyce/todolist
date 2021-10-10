import {authAPI, LoginParamsType} from '../../api/auth-api'
import {ThunkType} from '../../types/common-types'
import {setAppStatus} from './app-actions'
import {networkErrorsHandler, serverErrorsHandler} from '../../utils/error-utils'
import {ServerStatuses} from '../../types/server-response-types'

export enum AUTH_ACTIONS_TYPES {
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
    LOGOUT = 'LOGOUT'
}

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof logout>

// Actions
export const setIsLoggedIn = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN, payload: {status}
} as const)

export const logout = () => ({
    type: AUTH_ACTIONS_TYPES.LOGOUT
} as const)

// Thunks
export const login = (data: LoginParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.login(data)
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}