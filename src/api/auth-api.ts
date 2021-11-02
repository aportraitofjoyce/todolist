import {axiosInstance} from './axios-instance'
import {ServerResponse} from '../types/server-response-types'
import {AxiosResponse} from 'axios'

export type LoginData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type MeResponse = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    login: (payload: LoginData) => axiosInstance
        .post<LoginData, AxiosResponse<ServerResponse<{ userId: number }>>>('/auth/login', payload)
        .then(response => response.data),

    logout: () => axiosInstance
        .delete<ServerResponse>('/auth/login')
        .then(response => response.data),

    me: () => axiosInstance
        .get<ServerResponse<MeResponse>>('/auth/me')
        .then(response => response.data)
}