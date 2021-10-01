import {axiosInstance} from './axios-instance'

export type TodolistsResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export const todolistsAPI = {
    requestTodolists: () => axiosInstance
        .get<TodolistsResponseType[]>('/todo-lists')
        .then(response => response.data),

    createTodolist: (title: string) => axiosInstance
        .post<ResponseType<{ item: TodolistsResponseType }>>('/todo-lists', {title})
        .then(response => response.data),

    updateTodolist: (id: string, title: string) => axiosInstance
        .put<ResponseType>(`/todo-lists/${id}`, {title})
        .then(response => response.data),

    deleteTodolist: (id: string) => axiosInstance
        .delete<ResponseType>(`/todo-lists/${id}`)
        .then(response => response.data),
}