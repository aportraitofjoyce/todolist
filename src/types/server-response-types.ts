export type ServerResponse<T = {}> = {
    resultCode: ServerStatuses
    fieldsErrors: FieldsError[]
    messages: string[]
    data: T
}

type FieldsError = {
    field: string
    error: string
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