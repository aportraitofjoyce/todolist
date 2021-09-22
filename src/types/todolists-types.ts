import {TodolistsResponseType} from '../api/todolists-api'

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = TodolistsResponseType & {
    filter: FilterValuesType
}