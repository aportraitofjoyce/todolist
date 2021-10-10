import {AppStatusType} from '../../types/app-types'

export enum APP_ACTIONS_TYPES {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR',
    SET_INITIALIZED = 'SET_INITIALIZED',
}

export type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialized>

export const setAppStatus = (status: AppStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_STATUS, payload: {status}
} as const)

export const setAppError = (error: string | null) => ({
    type: APP_ACTIONS_TYPES.SET_ERROR, payload: {error}
} as const)

export const setAppInitialized = (isInitialized: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_INITIALIZED, payload: {isInitialized}
} as const)