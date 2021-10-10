import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useAppSelector} from '../../hooks/hooks'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/actions/auth-actions'
import {Button} from '../UI/Button/Button'

export const Navigation: FC = () => {
    const {isLoggedIn, login} = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = () => dispatch(logout())

    return (
        <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
            <Link to={PATH.TODOLIST}>Home</Link>
            {!isLoggedIn && <Link to={PATH.LOGIN}>Login</Link>}
            {isLoggedIn && <>
				<Button onClick={logoutHandler}>Logout</Button>
				<span>Hello {login}</span>
			</>}

        </div>
    )
}