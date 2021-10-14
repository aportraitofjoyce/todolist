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
        setAppStatus: (state, action: PayloadAction<AppStatusType>) => {
            state.status = action.payload
        },
        setAppError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions