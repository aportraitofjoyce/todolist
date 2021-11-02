import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setAppInitialized, setAppIsLoading} from '../app-reducer/app-reducer'
import {authAPI, LoginData, MeResponse} from '../../../api/auth-api'
import {ServerStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'

type InitialState = {
    isLoggedIn: boolean
    id?: number
    email?: string
    login?: string
}

export const login = createAsyncThunk('auth/login', async (arg: { loginData: LoginData }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.login(arg.loginData)

        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(setIsLoggedIn({status: true}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: response.messages, fieldErrors: response.fieldsErrors})
        }
    } catch (error) {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: error.messages, fieldErrors: undefined})
    }
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.me()
        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(setIsLoggedIn({status: true}))
            thunkAPI.dispatch(setAuthData({data: response.data}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    } finally {
        thunkAPI.dispatch(setAppInitialized({status: true}))
    }
})

export const logout = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await authAPI.logout()
        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(setIsLoggedIn({status: false}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as InitialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isLoggedIn = action.payload.status
        },
        setAuthData: (state, action: PayloadAction<{ data: MeResponse }>) => {
            return {...action.payload.data, isLoggedIn: true}
        }
    },
})

export const authReducer = slice.reducer
const {setIsLoggedIn, setAuthData} = slice.actions