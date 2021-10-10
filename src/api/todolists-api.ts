import {axiosInstance} from './axios-instance'
import {ServerResponseType} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

export type TodolistsResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistsAPI = {
    requestTodolists: () => axiosInstance
        .get<TodolistsResponseType[]>('/todo-lists')
        .then(response => response.data),

    createTodolist: (title: string) => axiosInstance
        .post<{ title: string }, AxiosResponse<ServerResponseType<{ item: TodolistsResponseType }>>>('/todo-lists', {title})
        .then(response => response.data),

    updateTodolist: (id: string, title: string) => axiosInstance
        .put<{ title: string }, AxiosResponse<ServerResponseType>>(`/todo-lists/${id}`, {title})
        .then(response => response.data),

    deleteTodolist: (id: string) => axiosInstance
        .delete<ServerResponseType>(`/todo-lists/${id}`)
        .then(response => response.data),
}