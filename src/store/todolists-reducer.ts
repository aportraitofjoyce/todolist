import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    TODOLIST_ID: string
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
    TODOLIST_ID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    title: string
    TODOLIST_ID: string
}
export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return [...state.filter(tdl => tdl.id !== action.TODOLIST_ID)]

        case ADD_TODOLIST:
            const NEW_TODOLIST_ID = v1()
            const newTodolist: TodolistType = {
                id: NEW_TODOLIST_ID,
                title: action.title,
                filter: "All"
            }
            return [...state, newTodolist]

        case CHANGE_TODOLIST_FILTER:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, filter: action.filter} : tdl))]

        case CHANGE_TODOLIST_TITLE:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, title: action.title} : tdl))]

        default:
            return state
    }
}

export const RemoveTodolistAC = (TODOLIST_ID: string): RemoveTodolistActionType => (
    {type: REMOVE_TODOLIST, TODOLIST_ID}
)

export const AddTodolistAC = (title: string): AddTodolistActionType => (
    {type: ADD_TODOLIST, title}
)

export const ChangeTodolistFilterAC = (filter: FilterValuesType, TODOLIST_ID: string): ChangeTodolistFilterActionType => (
    {type: CHANGE_TODOLIST_FILTER, filter, TODOLIST_ID}
)

export const ChangeTodolistTitleAC = (title: string, TODOLIST_ID: string): ChangeTodolistTitleActionType => (
    {type: CHANGE_TODOLIST_TITLE, title, TODOLIST_ID}
)

