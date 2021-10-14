import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {Snackbar} from './Snackbar'
import {useAppSelector} from '../../../hooks/hooks'
import {setAppError} from '../../../store/reducers/app-reducer/app-reducer'

export const ErrorSnackbar: React.FC = React.memo(() => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppError(null))
    }, [dispatch])

    return <Snackbar type={'error'} text={error} open={!!error} onClose={onCloseHandler}/>
})