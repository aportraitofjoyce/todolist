import {setAppError, setAppStatus} from '../store/actions/app-actions'
import {Dispatch} from 'react'
import {ActionsType} from '../types/common-types'
import {ServerResponseType} from '../types/server-response-types'

export const networkErrorsHandler = (message: string, dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(message))
}

export const serverErrorsHandler = <T>(response: ServerResponseType<T>, dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppError(response.messages[0] || 'Unrecognized error'))
    dispatch(setAppStatus('failed'))
}