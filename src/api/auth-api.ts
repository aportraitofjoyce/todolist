import {axiosInstance} from './axios-instance'
import {ServerResponseType} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login: (data: LoginParamsType) => axiosInstance
        .post<LoginParamsType, AxiosResponse<ServerResponseType<{ userId: number }>>>('/auth/login', data)
        .then(response => response.data),

    logout: () => axiosInstance
        .delete<ServerResponseType>('/auth/login')
        .then(response => response.data)
}