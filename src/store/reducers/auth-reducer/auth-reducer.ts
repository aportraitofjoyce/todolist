import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
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

export const login = createAsyncThunk('auth/login', async (arg: { loginData: LoginParamsType }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.login(arg.loginData)

        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(setIsLoggedIn({status: true}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

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

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as InitialState,
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