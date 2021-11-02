import {FC} from 'react'
import {Todolists} from '../pages/Todolists/Todolists'
import {Login} from '../pages/Login/Login'
import {Error} from '../pages/Error/Error'
import {Home} from '../pages/Home/Home'

export enum PATH {
    HOME = '/',
    EMPTY = '',
    TODOLIST = '/todolist',
    LOGIN = '/login',
    ERROR = '/404'
}

type Route = {
    path: PATH
    component: FC
    exact?: boolean
}

export const routes: Route[] = [
    {path: PATH.HOME, component: Home, exact: true},
    {path: PATH.TODOLIST, component: Todolists},
    {path: PATH.LOGIN, component: Login},
    {path: PATH.ERROR, component: Error},
]