import {FunctionComponent} from 'react'
import {Todolists} from '../pages/Todolists/Todolists'
import {Login} from '../pages/Login/Login'

export enum PATH {
    EMPTY = '',
    TODOLIST = '/',
    LOGIN = '/login',
    ERROR = '/404'
}

type RoutesType = {
    path: PATH
    component: FunctionComponent
    exact?: boolean
}

export const privateRoutes: RoutesType[] = [
    {path: PATH.TODOLIST, component: Todolists, exact: true},
]

export const publicRoutes: RoutesType[] = [
    {path: PATH.LOGIN, component: Login},
]