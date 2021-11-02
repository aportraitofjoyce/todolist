import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {logout} from '../../store/reducers/auth-reducer/auth-reducer'
import s from './Navigation.module.css'

export const Navigation: FC = () => {
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const logoutHandler = () => dispatch(logout())

    return (
        <div className={s.wrapper}>
            <nav className={s.container}>
                <NavLink activeClassName={s.active} to={PATH.HOME}>Home</NavLink>
                <NavLink activeClassName={s.active} to={PATH.TODOLIST}>Todolist</NavLink>

                {!isLoggedIn
                    ? <NavLink activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                    : <span onClick={logoutHandler}>Logout</span>}
            </nav>
        </div>
    )
}