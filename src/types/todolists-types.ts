import {TodolistsResponseType} from '../api/todolists-api'
import {AppStatusType} from './app-types'

export type TodolistType = TodolistsResponseType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'