import {TASKS_ACTIONS_TYPES, TasksActionsType} from '../../actions/tasks-actions/tasks-actions'
import {TODOLISTS_ACTIONS_TYPES} from '../../actions/todolists-actions/todolists-actions'
import {TasksType} from '../../../types/tasks-types'
import {TasksResponseType} from '../../../api/tasks-api'

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPES.REMOVE_TASK:
            return {
                ...state,
                [action.payload.TODOLIST_ID]: state[action.payload.TODOLIST_ID]
                    .filter(t => t.id !== action.payload.taskID)
            }

        case TASKS_ACTIONS_TYPES.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.TODOLIST_ID]: state[action.payload.TODOLIST_ID]
                    .map(t => (t.id === action.payload.taskID ? {...t, status: action.payload.status} : t))
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.TODOLIST_ID]: state[action.payload.TODOLIST_ID]
                    .map(t => (t.id === action.payload.taskID ? {...t, title: action.payload.title} : t))
            }

        case TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME:
            return {
                ...state,
                [action.payload.TODOLIST_ID]: [...state[action.payload.TODOLIST_ID]]
                    .sort((a: TasksResponseType, b: TasksResponseType) => a['title'] > b['title'] ? 1 : -1)
            }

        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return {
                ...state,
                [action.payload.NEW_TODOLIST_ID]: []
            }

        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            /*const stateCopy = {...state}
            delete stateCopy[action.TODOLIST_ID]*/
            const {[action.payload.TODOLIST_ID]: any, ...newState} = state
            return newState

        case TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS:
            const stateCopy = {...state}
            action.payload.todolists.forEach(tdl => stateCopy[tdl.id] = [])
            return stateCopy

        case TASKS_ACTIONS_TYPES.SET_TASKS:
            return {
                ...state,
                [action.payload.TODOLIST_ID]: action.payload.tasks
            }

        default:
            return state
    }
}