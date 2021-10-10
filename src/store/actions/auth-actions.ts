import {authAPI, LoginParamsType, MeDataResponseType} from '../../api/auth-api'
import {ThunkType} from '../../types/common-types'
import {setAppInitialized, setAppStatus} from './app-actions'
import {networkErrorsHandler, serverErrorsHandler} from '../../utils/error-utils'
import {ServerStatuses} from '../../types/server-response-types'

export enum AUTH_ACTIONS_TYPES {
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
    LOGOUT = 'LOGOUT',
    SET_AUTH_DATA = 'SET_AUTH_DATA'
}

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setAuthData>

// Actions
export const setIsLoggedIn = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN, payload: {status}
} as const)

export const setAuthData = (data: MeDataResponseType) => ({
    type: AUTH_ACTIONS_TYPES.SET_AUTH_DATA, payload: {data}
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

export const me = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.me()
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
            dispatch(setAuthData(response.data))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    } finally {
        dispatch(setAppInitialized(true))
    }
}

export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.logout()
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus('succeeded'))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}
