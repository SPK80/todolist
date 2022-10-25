import {instance} from "common/api/instance";
import {
    axiosErrorToString,
    checkResultCodeAndGetData,
    getDataFromAxiosResponse,
    ResponseWithResultCodeType
} from "common/api/parseResponse";

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type AuthResponseDataType = {
    id: number
    email: string
    login: string
}

export const authApi = {
    async me() {
        return instance.get<ResponseWithResultCodeType<AuthResponseDataType>>('auth/me')
            .then(getDataFromAxiosResponse)
            .catch(axiosErrorToString)
            .then(checkResultCodeAndGetData)
    },
    async login(data: LoginDataType) {
        return instance.post<ResponseWithResultCodeType<AuthResponseDataType>>('auth/login', data)
            .then(getDataFromAxiosResponse)
            .catch(axiosErrorToString)
            .then(checkResultCodeAndGetData)
    },
    async logout() {
        return instance.delete<ResponseWithResultCodeType>('auth/login')
            .then(getDataFromAxiosResponse)
            .catch(axiosErrorToString)
            .then(checkResultCodeAndGetData)
    },
}
