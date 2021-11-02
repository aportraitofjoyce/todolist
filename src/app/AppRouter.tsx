import React, {FC, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PATH, routes} from '../routes/routes'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {checkAuth} from '../store/reducers/auth-reducer/auth-reducer'
import {Progress} from '../components/UI/Progress/Progress'

export const AppRouter: FC = () => {
    const {isInitialized, isLoading} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isInitialized) return <Progress/>

    return (
        <>
            {isLoading && <Progress/>}
            <Switch>
                {routes.map(r => <Route key={r.path} path={r.path} component={r.component} exact={r.exact}/>)}

                <Redirect from={PATH.EMPTY} to={PATH.ERROR}/>
            </Switch>
        </>
    )
}