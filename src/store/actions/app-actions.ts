import {AppStatusType} from '../../types/app-types'

export enum APP_ACTIONS_TYPES {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR'
}

export type AppActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

export const setAppStatus = (status: AppStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_STATUS, payload: {status}
} as const)

export const setAppError = (error: string | null) => ({
    type: APP_ACTIONS_TYPES.SET_ERROR, payload: {error}
} as const)