import {axiosInstance} from './axios-instance'

type TasksResponseType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
type RequestTasksResponseType = {
    items: TasksResponseType[]
    totalCount: number
    error: string
}

type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}

export const tasksAPI = {
    requestTasks: (todoID: string) => axiosInstance
        .get<RequestTasksResponseType>(`todo-lists/${todoID}/tasks`),

    createTask: (todoID: string, title: string) => axiosInstance
        .post<ResponseType<{ item: TasksResponseType }>>(`todo-lists/${todoID}/tasks`, {title}),

    updateTask: (todoID: string, taskID: string, title: string) => axiosInstance
        .put<ResponseType<{ item: TasksResponseType }>>(`todo-lists/${todoID}/tasks/${taskID}`, {title}),

    deleteTask: (todoID: string, taskID: string) => axiosInstance
        .delete<ResponseType<{}>>(`todo-lists/${todoID}/tasks/${taskID}`),
}