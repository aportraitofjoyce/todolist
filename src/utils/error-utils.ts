import {ServerResponseType} from '../types/server-response-types'
import {AppDispatch} from '../store/store'
import {setAppError, setAppStatus} from '../store/reducers/app-reducer/app-reducer'

export const networkErrorsHandler = (message: string, dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setAppError({error: message}))
}

export const serverErrorsHandler = <T>(response: ServerResponseType<T>, dispatch: AppDispatch) => {
    dispatch(setAppError({error: response.messages[0] || 'Unrecognized error'}))
    dispatch(setAppStatus({status: 'failed'}))
}