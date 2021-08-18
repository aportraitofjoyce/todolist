import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

export type ActionsType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof changeTodolistTitleAC>

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return [...state.filter(tdl => tdl.id !== action.TODOLIST_ID)]

        case ADD_TODOLIST:
            const newTodolist: TodolistType = {id: action.NEW_TODOLIST_ID, title: action.title, filter: 'All'}
            return [...state, newTodolist]

        case CHANGE_TODOLIST_FILTER:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, filter: action.filter} : tdl))]

        case CHANGE_TODOLIST_TITLE:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, title: action.title} : tdl))]

        default:
            return state
    }
}

export const removeTodolistAC = (TODOLIST_ID: string) => (
    {type: REMOVE_TODOLIST, TODOLIST_ID}
) as const

export const addTodolistAC = (title: string) => (
    {type: ADD_TODOLIST, title, NEW_TODOLIST_ID: v1()}
) as const

export const changeTodolistFilterAC = (filter: FilterValuesType, TODOLIST_ID: string) => (
    {type: CHANGE_TODOLIST_FILTER, filter, TODOLIST_ID}
) as const

export const changeTodolistTitleAC = (title: string, TODOLIST_ID: string) => (
    {type: CHANGE_TODOLIST_TITLE, title, TODOLIST_ID}
) as const

