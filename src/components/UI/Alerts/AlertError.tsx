import React, {FC, memo, useCallback} from 'react'
import {Alert} from './Alert'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {setAppError} from '../../../store/reducers/app-reducer/app-reducer'

export const AlertError: FC = memo(() => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const onCloseHandler = useCallback(() => {
        dispatch(setAppError({error: ''}))
    }, [dispatch])

    return <Alert type={'error'} text={error} open={!!error} onClose={onCloseHandler}/>
})