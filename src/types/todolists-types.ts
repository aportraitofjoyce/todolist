import {TodolistsResponseType} from '../api/todolists-api'
import {AppStatusType} from './app-types'

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = TodolistsResponseType & {
    filter: FilterValuesType
    status: AppStatusType
}