import {ServerResponseType} from '../types/server-response-types'
import {AppDispatch} from '../store/store'
import {setAppError, setAppStatus} from '../store/reducers/app-reducer/app-reducer'

export const networkErrorsHandler = (message: string, dispatch: AppDispatch) => {
    dispatch(setAppStatus('failed'))
    dispatch(setAppError(message))
}

export const serverErrorsHandler = <T>(response: ServerResponseType<T>, dispatch: AppDispatch) => {
    dispatch(setAppError(response.messages[0] || 'Unrecognized error'))
    dispatch(setAppStatus('failed'))
}