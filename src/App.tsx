import React from 'react'
import {TodolistsContainer} from './components/Todolist/TodolistsContainer'
import {Progress} from './components/UI/Progress/Progress'
import {Alerts} from './components/UI/Alerts/Alerts'
import {useAppSelector} from './hooks/hooks'

export const App = () => {
    const appStatus = useAppSelector(state => state.app.status)

    return (
        <>
            {appStatus === 'loading' && <Progress/>}
            <Alerts/>
            <TodolistsContainer/>
        </>
    )
}