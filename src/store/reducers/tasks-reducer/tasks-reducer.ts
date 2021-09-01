import {TasksType, TaskType} from '../../../components/Todolist/TodolistsContainer'
import {v1} from 'uuid'
import {
    ADD_TASK,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_TITLE,
    REMOVE_TASK,
    SORT_TASKS_BY_NAME,
    TasksActionsType
} from '../../actions/tasks-actions/tasks-actions'
import {ADD_TODOLIST, REMOVE_TODOLIST} from '../../actions/todolists-actions/todolists-actions'

/*const initialState: TasksType = {
    [TODOLIST_ID_1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ],

    [TODOLIST_ID_2]: [
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Cola', isDone: false},
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'Smoke', isDone: true}
    ]
}*/

const initialState: TasksType = {}


export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID].filter(t => t.id !== action.taskID)
            }

        case ADD_TASK:
            return {
                ...state,
                [action.TODOLIST_ID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.TODOLIST_ID]]
            }

        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID]
                    .map(t => (t.id === action.taskID ? {...t, isDone: action.isDone} : t))
            }

        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID]
                    .map(t => (t.id === action.taskID ? {...t, title: action.title} : t))
            }

        case SORT_TASKS_BY_NAME:
            return {
                ...state,
                [action.TODOLIST_ID]: state[action.TODOLIST_ID]
                    .sort((a: TaskType, b: TaskType) => a['title'] > b['title'] ? 1 : -1)
            }

        case ADD_TODOLIST:
            return {
                ...state,
                [action.NEW_TODOLIST_ID]: []
            }

        case REMOVE_TODOLIST:
            /*const stateCopy = {...state}
            delete stateCopy[action.TODOLIST_ID]*/
            const {[action.TODOLIST_ID]: any, ...newState} = state
            return newState

        default:
            return state
    }
}