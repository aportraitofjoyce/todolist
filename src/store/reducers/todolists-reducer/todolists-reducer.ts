import {TodolistsActionsType, TODOLISTS_ACTIONS_TYPES} from '../../actions/todolists-actions'
import {TodolistType} from '../../../types/todolists-types'

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS:
            return action.payload.todolists.map(tdl => ({...tdl, filter: 'All'}))

        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return [{...action.payload.todolist, filter: 'All'}, ...state]

        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            return [...state.filter(tdl => tdl.id !== action.payload.TODOLIST_ID)]

        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_TITLE:
            return [...state.map(tdl => tdl.id === action.payload.TODOLIST_ID
                ? {...tdl, title: action.payload.title} : tdl)]

        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER:
            return [...state.map(tdl => tdl.id === action.payload.TODOLIST_ID ? {
                ...tdl,
                filter: action.payload.filter
            } : tdl)]

        default:
            return state
    }
}