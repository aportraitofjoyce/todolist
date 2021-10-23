type FieldsError = {
    field: string
    error: string
}

export type ServerResponseType<T = {}> = {
    resultCode: ServerStatuses
    fieldsErrors: FieldsError[]
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

