import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type InitialState = {
    isLoading: boolean
    error: string
    isInitialized: boolean
}

const slice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        error: '',
        isInitialized: false
    } as InitialState,
    reducers: {
        setAppIsLoading: (state, action: PayloadAction<{ status: boolean }>) => {
            //state.isLoading = action.payload.status
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