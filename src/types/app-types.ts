export type AppReducerType = {
    status: AppStatusType
    error: string | null
    isInitialized: boolean
}

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'