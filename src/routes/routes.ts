import {FC} from 'react'
import {Todolists} from '../pages/Todolists/Todolists'
import {Login} from '../pages/Login/Login'
import {Error} from '../pages/Error/Error'

export enum PATH {
    EMPTY = '',
    TODOLIST = '/',
    LOGIN = '/login',
    ERROR = '/404'
}

type RoutesType = {
    path: PATH
    component: FC
    exact?: boolean
}

export const routes: RoutesType[] = [
    {path: PATH.TODOLIST, component: Todolists, exact: true},
    {path: PATH.LOGIN, component: Login},
    {path: PATH.ERROR, component: Error},
]