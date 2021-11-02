import {axiosInstance} from './axios-instance'
import {ServerResponse, TaskStatuses} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

type GetTasksResponse = {
    items: TaskResponse[]
    totalCount: number
    error: string
}

export type TaskResponse = {
    title: string
    status: TaskStatuses
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdatedTask = {
    title: string
    status: TaskStatuses
}

export const tasksAPI = {
    getTasks: (todoID: string) => axiosInstance
        .get<GetTasksResponse>(`/todo-lists/${todoID}/tasks`)
        .then(response => response.data),

    createTask: (todoID: string, title: string) => axiosInstance
        .post<{ title: string }, AxiosResponse<ServerResponse<{ item: TaskResponse }>>>(`/todo-lists/${todoID}/tasks`, {title})
        .then(response => response.data),

    updateTask: (todoID: string, taskID: string, task: UpdatedTask) => axiosInstance
        .put<UpdatedTask, AxiosResponse<ServerResponse<{ item: TaskResponse }>>>(`/todo-lists/${todoID}/tasks/${taskID}`, task)
        .then(response => response.data),

    deleteTask: (taskID: string, todoID: string) => axiosInstance
        .delete<ServerResponse>(`/todo-lists/${todoID}/tasks/${taskID}`)
        .then(response => response.data),
}