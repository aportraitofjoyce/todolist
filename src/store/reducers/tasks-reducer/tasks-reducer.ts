import {v1} from 'uuid'
import {TASKS_ACTIONS_TYPES, TasksActionsType} from '../../actions/tasks-actions/tasks-actions'
import {TODOLISTS_ACTIONS_TYPES} from '../../actions/todolists-actions/todolists-actions'
import {TasksType} from '../../../types/tasks-types'
import {TaskPriorities, TasksResponseType, TaskStatuses} from '../../../api/tasks-api'

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPES.REMOVE_TASK:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID].filter(t => t.id !== action.taskID)
            }

        case TASKS_ACTIONS_TYPES.ADD_TASK:
            return {
                ...state,
                [action.TODOLIST_ID]: [
                    {
                        id: v1(),
                        title: action.title,
                        addedDate: '',
                        order: 0,
                        deadline: '',
                        description: '',
                        priority: TaskPriorities.Low,
                        startDate: '',
                        status: TaskStatuses.New,
                        todoListId: action.TODOLIST_ID
                    },
                    ...state[action.TODOLIST_ID]
                ]
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID]
                    .map(t => (t.id === action.taskID ? {...t, status: action.status} : t))
            }

        case TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID]
                    .map(t => (t.id === action.taskID ? {...t, title: action.title} : t))
            }

        case TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME:
            return {
                ...state,
                [action.TODOLIST_ID]: [...state[action.TODOLIST_ID]]
                    .sort((a: TasksResponseType, b: TasksResponseType) => a['title'] > b['title'] ? 1 : -1)
            }

        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST:
            return {
                ...state,
                [action.NEW_TODOLIST_ID]: []
            }

        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST:
            /*const stateCopy = {...state}
            delete stateCopy[action.TODOLIST_ID]*/
            const {[action.TODOLIST_ID]: any, ...newState} = state
            return newState

        default:
            return state
    }
}