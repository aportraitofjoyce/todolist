import {TasksResponseType} from '../api/tasks-api'

export type TasksType = {
    [key: string]: TasksResponseType[]
}