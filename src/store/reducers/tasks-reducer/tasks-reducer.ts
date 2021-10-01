import {TASKS_ACTIONS_TYPES, TasksActionsType} from '../../actions/tasks-actions'
import {TODOLISTS_ACTIONS_TYPES} from '../../actions/todolists-actions'
import {TasksType} from '../../../types/tasks-types'
import {TasksResponseType} from '../../../api/tasks-api'

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS:
            const stateCopy = {...state}
            action.payload.todolists.forEach(tdl => stateCopy[tdl.id] = [])
            return stateCopy

        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return {
                ...state,
                [action.payload.todolist.id]: []
            }

        case TASKS_ACTIONS_TYPES.SET_TASKS:
            return {
                ...state,
                [action.payload.todolistID]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }

        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            // Destruct state and return without removed todolist
            const {[action.payload.todolistID]: any, ...newState} = state
            return newState

        case TASKS_ACTIONS_TYPES.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }

        case TASKS_ACTIONS_TYPES.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(t => t.id !== action.payload.taskID)
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, title: action.payload.title} : t))
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, status: action.payload.status} : t))
            }

        case TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME:
            // Local sort
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID]]
                    .sort((a: TasksResponseType, b: TasksResponseType) => a['title'] > b['title'] ? 1 : -1)
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_ENTITY_STATUS:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, entityStatus: action.payload.entityStatus} : t))
            }

        default:
            return state
    }
}