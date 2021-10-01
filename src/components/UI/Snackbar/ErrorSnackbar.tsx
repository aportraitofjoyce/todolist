import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../../types/common-types'
import {Snackbar} from './Snackbar'
import {setAppError} from '../../../store/actions/app-actions'

export const ErrorSnackbar: React.FC = React.memo(() => {
    const error = useSelector<StateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppError(null))
    }, [dispatch])

    return <Snackbar text={error} open={!!error} onClose={onCloseHandler}/>
})