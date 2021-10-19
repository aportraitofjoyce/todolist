import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {Button} from '../UI/Button/Button'
import {logout} from '../../store/reducers/auth-reducer/auth-reducer'

export const Navigation: FC = () => {
    const {isLoggedIn, login} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return (
        <div>
            {!isLoggedIn && <Link to={PATH.LOGIN}><Button>Login</Button></Link>}

            {isLoggedIn && <>
				<Button onClick={() => dispatch(logout())}>Logout</Button>
				<span>Hello {login}</span>
			</>}

        </div>
    )
}