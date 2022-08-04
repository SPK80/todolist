import {AxiosResponse} from "axios";

export type ResponseType<DT = {}> = {
    resultCode: number
    messages: string[]
    data: DT
}
export const parseResponse = <DT>(res: AxiosResponse<ResponseType<DT>>): Promise<DT> => {
    const {data, messages, resultCode} = res.data;
    if (resultCode === 0) return Promise.resolve(data)
    else return Promise.reject(messages)
}