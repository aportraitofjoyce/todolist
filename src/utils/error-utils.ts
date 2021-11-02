import {ServerResponse} from '../types/server-response-types'
import {AppDispatch} from '../store/store'
import {setAppError} from '../store/reducers/app-reducer/app-reducer'

export const networkErrorsHandler = (message: string, dispatch: AppDispatch) => {
    dispatch(setAppError({error: message}))
}

export const serverErrorsHandler = <T>(response: ServerResponse<T>, dispatch: AppDispatch) => {
    dispatch(setAppError({error: response.messages[0] || 'Unrecognized error'}))
}