import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch} from '../../store'
import {setAppInitialized, setAppIsLoading} from '../app-reducer/app-reducer'
import {authAPI, LoginParamsType, MeDataResponseType} from '../../../api/auth-api'
import {ServerStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'

type InitialState = {
    isLoggedIn: boolean
    id?: number
    email?: string
    login?: string
}

const initialState: InitialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isLoggedIn = action.payload.status
        },
        setAuthData: (state, action: PayloadAction<{ data: MeDataResponseType }>) => {
            return {...action.payload.data, isLoggedIn: true}
        }
    },
})

export const authReducer = slice.reducer
const {setIsLoggedIn, setAuthData} = slice.actions

export const login = (data: LoginParamsType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.login(data)
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn({status: true}))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.me()
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn({status: true}))
            dispatch(setAuthData({data: response.data}))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    } finally {
        dispatch(setAppInitialized({status: true}))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.logout()
        if (response.resultCode === ServerStatuses.Success) {
            dispatch(setIsLoggedIn({status: false}))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}