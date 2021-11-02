import {ServerResponse} from '../types/server-response-types'
import {AppDispatch} from '../store/store'
import {setAppError} from '../store/reducers/app-reducer/app-reducer'
import {AxiosError} from 'axios'

export const serverErrorsHandler = <T>(response: ServerResponse<T>, dispatch: AppDispatch) => {
    dispatch(setAppError({error: response.messages[0] || 'Some server error'}))
}

export const networkErrorsHandler = (error: AxiosError, dispatch: AppDispatch) => {
    dispatch(setAppError({error: error.message ? error.message : 'Some network error'}))
}