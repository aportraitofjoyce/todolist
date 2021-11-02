import React, {FC} from 'react'
import {Link, NavLink} from 'react-router-dom'
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
                <Link to={PATH.HOME}>Home</Link>
                <NavLink activeClassName={s.active} to={PATH.TODOLIST}>Todo</NavLink>

                {!isLoggedIn
                    ? <NavLink activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                    : <span onClick={logoutHandler}>Logout</span>}
            </nav>
        </div>
    )
}