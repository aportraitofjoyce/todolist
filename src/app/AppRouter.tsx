import React, {FC, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PATH} from '../routes/routes'
import {Todolists} from '../pages/Todolists/Todolists'
import {Login} from '../pages/Login/Login'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {Error} from '../pages/Error/Error'
import {checkAuth} from '../store/reducers/auth-reducer/auth-reducer'
import {Progress} from '../components/UI/Progress/Progress'

export const AppRouter: FC = () => {
    const appStatus = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isInitialized) return <Progress/>

    return (
        <>
            {appStatus === 'loading' && <Progress/>}
            <Switch>
                <Route path={PATH.TODOLIST} component={Todolists} exact/>
                <Route path={PATH.LOGIN} component={Login}/>

                <Route path={PATH.ERROR} component={Error}/>
                <Redirect from={PATH.EMPTY} to={PATH.ERROR}/>
            </Switch>
        </>
    )
}