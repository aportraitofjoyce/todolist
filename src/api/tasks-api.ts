import {axiosInstance} from './axios-instance'
import {ServerResponseType, TaskPriorities, TaskStatuses} from '../types/server-response-types'
import {AxiosResponse} from 'axios'
import {AppStatusType} from '../store/reducers/app-reducer/app-reducer'

export type TasksResponseType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: AppStatusType
}

type RequestTasksResponseType = {
    items: TasksResponseType[]
    totalCount: number
    error: string
}

export type UpdatedTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const tasksAPI = {
    requestTasks: (todoID: string) => axiosInstance
        .get<RequestTasksResponseType>(`todo-lists/${todoID}/tasks`)
        .then(response => response.data),

    createTask: (todoID: string, title: string) => axiosInstance
        .post<{ title: string }, AxiosResponse<ServerResponseType<{ item: TasksResponseType }>>>(`todo-lists/${todoID}/tasks`, {title})
        .then(response => response.data),

    updateTask: (todoID: string, taskID: string, task: UpdatedTaskType) => axiosInstance
        .put<UpdatedTaskType, AxiosResponse<ServerResponseType<{ item: TasksResponseType }>>>(`todo-lists/${todoID}/tasks/${taskID}`, task)
        .then(response => response.data),

    deleteTask: (taskID: string, todoID: string) => axiosInstance
        .delete<ServerResponseType>(`todo-lists/${todoID}/tasks/${taskID}`)
        .then(response => response.data),
}