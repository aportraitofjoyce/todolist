export type ServerResponseType<T = {}> = {
    resultCode: ServerStatuses
    messages: string[]
    data: T
}

export enum ServerStatuses {
    Success = 0,
    Error = 1,
    Captcha = 10
}

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