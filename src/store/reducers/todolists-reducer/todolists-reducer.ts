import {TodolistType} from '../../../components/Todolist/TodolistContainer'
import {
    TodolistsActionsType,
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST
} from '../../actions/todolists-actions/todolists-actions'
import {v1} from 'uuid'

export const TODOLIST_ID_1 = v1()
export const TODOLIST_ID_2 = v1()

const initialState: TodolistType[] = [
    {id: TODOLIST_ID_1, title: 'What to learn', filter: 'All'},
    {id: TODOLIST_ID_2, title: 'What to buy', filter: 'All'}
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionsType): TodolistType[] => {
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