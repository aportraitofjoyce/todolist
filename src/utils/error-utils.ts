import {ServerResponseType} from '../types/server-response-types'
import {AppDispatch} from '../store/store'
import {setAppError, setAppIsLoading} from '../store/reducers/app-reducer/app-reducer'

export const networkErrorsHandler = (message: string, dispatch: AppDispatch) => {
    dispatch(setAppIsLoading({status: false}))
    dispatch(setAppError({error: message}))
}

export const serverErrorsHandler = <T>(response: ServerResponseType<T>, dispatch: AppDispatch) => {
    dispatch(setAppError({error: response.messages[0] || 'Unrecognized error'}))
    dispatch(setAppIsLoading({status: false}))
}