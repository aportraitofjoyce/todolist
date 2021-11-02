import {axiosInstance} from './axios-instance'
import {ServerResponse} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

export type TodolistsResponse = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistsAPI = {
    getTodolists: () => axiosInstance
        .get<TodolistsResponse[]>('/todo-lists')
        .then(response => response.data),

    createTodolist: (title: string) => axiosInstance
        .post<{ title: string }, AxiosResponse<ServerResponse<{ item: TodolistsResponse }>>>('/todo-lists', {title})
        .then(response => response.data),

    updateTodolist: (id: string, title: string) => axiosInstance
        .put<{ title: string }, AxiosResponse<ServerResponse>>(`/todo-lists/${id}`, {title})
        .then(response => response.data),

    deleteTodolist: (id: string) => axiosInstance
        .delete<ServerResponse>(`/todo-lists/${id}`)
        .then(response => response.data),
}