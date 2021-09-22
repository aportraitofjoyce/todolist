import {TodolistsActionsType, TODOLISTS_ACTIONS_TYPES} from '../../actions/todolists-actions/todolists-actions'
import {TodolistType} from '../../../types/todolists-types'

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            return [...state.filter(tdl => tdl.id !== action.TODOLIST_ID)]

        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.NEW_TODOLIST_ID,
                    title: action.title,
                    filter: 'All',
                    addedDate: '',
                    order: 0
                }
            ]

        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, filter: action.filter} : tdl))]

        case TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_TITLE:
            return [...state.map(tdl => (tdl.id === action.TODOLIST_ID ? {...tdl, title: action.title} : tdl))]

        default:
            return state
    }
}