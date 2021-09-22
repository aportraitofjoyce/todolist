import {axiosInstance} from './axios-instance'

type RequestTodolistsResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export const todolistsAPI = {
    requestTodolists: () => axiosInstance
        .get<RequestTodolistsResponseType[]>('/todo-lists'),

    createTodolist: (title: string) => axiosInstance
        .post<ResponseType<{ item: RequestTodolistsResponseType }>>('/todo-lists', {title}),

    updateTodolist: (id: string, title: string) => axiosInstance
        .put<ResponseType<{}>>(`/todo-lists/${id}`, {title}),

    deleteTodolist: (id: string) => axiosInstance
        .delete<ResponseType<{}>>(`/todo-lists/${id}`),
}