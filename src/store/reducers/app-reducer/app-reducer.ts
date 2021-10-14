import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: 'I\'m test and my life is short',
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: AppStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isInitialized = action.payload.status
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions