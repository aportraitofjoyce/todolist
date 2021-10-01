import {axiosInstance} from './axios-instance'

export enum TaskStatuses {
    New,
    inProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

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
}

type RequestTasksResponseType = {
    items: TasksResponseType[]
    totalCount: number
    error: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
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
        .post<ResponseType<{ item: TasksResponseType }>>(`todo-lists/${todoID}/tasks`, {title})
        .then(response => response.data),

    updateTask: (todoID: string, taskID: string, task: UpdatedTaskType) => axiosInstance
        .put<ResponseType<{ item: TasksResponseType }>>(`todo-lists/${todoID}/tasks/${taskID}`, task)
        .then(response => response.data),

    deleteTask: (taskID: string, todoID: string) => axiosInstance
        .delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`)
        .then(response => response.data),
}