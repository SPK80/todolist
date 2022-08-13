export enum ResultCode {
    SUCCESSFUL = 0,
    BAD_RESPONSE = 1,
    BAD_CAPTCHA = 10,
}

export type ResponseWithResultCodeType<DT = {}> = {
    resultCode: ResultCode
    messages: string[]
    data: DT
}

export const checkResultCodeAndGetData = <DT>(res: ResponseWithResultCodeType<DT>): Promise<DT> => {
    const {data, messages, resultCode} = res
    if (resultCode === ResultCode.SUCCESSFUL) return Promise.resolve(data)
    else return Promise.reject(messages)
}

export type ResponseWithErrorType<DT> = {
    totalCount: number
    error: string
    items: Array<DT>
}

export const checkErrorAndGetItems = <DT>(res: ResponseWithErrorType<DT>): Promise<{ totalCount: number, items: Array<DT> }> => {
    const {totalCount, items, error} = res
    if (error) return Promise.reject(error)
    return Promise.resolve({totalCount, items})
}