import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialState = {
    isLoading: boolean
    error: string
    isInitialized: boolean
}

const initialState: InitialState = {
    isLoading: false,
    error: '',
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsLoading: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isLoading = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        },
        setAppInitialized: (state, action: PayloadAction<{ status: boolean }>) => {
            state.isInitialized = action.payload.status
        }
    }
})

export const appReducer = slice.reducer
export const {setAppIsLoading, setAppError, setAppInitialized} = slice.actions