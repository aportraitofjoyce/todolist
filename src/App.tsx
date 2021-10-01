import React from 'react'
import {TodolistsContainer} from './components/Todolist/TodolistsContainer'
import {useSelector} from 'react-redux'
import {StateType} from './types/common-types'
import {AppStatusType} from './types/app-types'
import {Progress} from './components/UI/Progress/Progress'
import {ErrorSnackbar} from './components/UI/Snackbar/ErrorSnackbar'

export const App = () => {
    const appStatus = useSelector<StateType, AppStatusType>(state => state.app.status)

    return (
        <>
            {appStatus === 'loading' && <Progress/>}
            <ErrorSnackbar/>
            <TodolistsContainer/>
        </>
    )
}