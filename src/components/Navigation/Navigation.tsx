import React, {FC} from 'react'
import { Link } from 'react-router-dom'
import {PATH} from '../../routes/routes'

export const Navigation: FC = () => {
    return (
        <div>
            <Link to={PATH.TODOLIST}>Home</Link>
            <Link to={PATH.LOGIN}>Login</Link>
        </div>
    )
}