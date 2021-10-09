import React, {FC} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PATH} from '../routes/routes'
import {Todolists} from '../pages/Todolists/Todolists'
import {Login} from '../pages/Login/Login'
import {Progress} from './UI/Progress/Progress'
import {useAppSelector} from '../hooks/hooks'
import {Error} from '../pages/Error/Error'

export const AppRouter: FC = () => {
    const appStatus = useAppSelector(state => state.app.status)

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