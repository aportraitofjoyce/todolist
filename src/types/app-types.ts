export type AppReducerType = {
    status: AppStatusType
    error: string | null
}

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'