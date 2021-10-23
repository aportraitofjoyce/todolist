import {axiosInstance} from './axios-instance'
import {ServerResponseType, TaskStatuses} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

export type TasksResponseType = {
    title: string
    status: TaskStatuses
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type RequestTasksResponseType = {
    items: TasksResponseType[]
    totalCount: number
    error: string
}

export type UpdatedTaskType = {
    title: string
    status: TaskStatuses
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