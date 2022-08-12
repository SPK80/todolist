import {instance} from "./instance";
import {
    checkErrorAndGetItems,
    checkResultCodeAndGetData,
    ResponseWithErrorType,
    ResponseWithResultCodeType
} from "./parseResponse";
import {AxiosResponse} from "axios";

const getDataFromAxiosResponse = <DT>(res: AxiosResponse<DT>): DT => res.data

export const todoListsApi = {
    
    //=============TODOLISTS============================================================================================
    async getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists')
            .then(res => res.data)
    },
    
    async createTodoList(title: string) {
        return instance.post<ResponseWithResultCodeType<{ item: TodoListType }>>('todo-lists', {title})
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
    async deleteTodoList(todolistId: string) {
        return instance.delete<ResponseWithResultCodeType>(`todo-lists/${todolistId}`)
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
    async updateTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseWithResultCodeType>(`todo-lists/${todolistId}`, {title})
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
    
    //=============TASKS================================================================================================
    async getTasks(todolistId: string, count?: number, page?: number) {
        // const params = {} as { count?: number, page?: number }
        // if (count) params.count = count
        // if (page) params.page = page
        return instance.get<ResponseWithErrorType<TaskType>>(`todo-lists/${todolistId}/tasks`)
            .then(getDataFromAxiosResponse)
            .then(checkErrorAndGetItems)
    },
    
    async createTask(todolistId: string, title: string) {
        return instance.post<ResponseWithResultCodeType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
    async removeTask(taskId: string, todoListId: string) {
        return instance.delete<ResponseWithResultCodeType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
    async updateTask(taskId: string, todoListId: string, updatingTask: TaskType) {
        return instance.put<ResponseWithResultCodeType>(`todo-lists/${todoListId}/tasks/${taskId}`, updatingTask)
            .then(getDataFromAxiosResponse)
            .then(checkResultCodeAndGetData)
    },
    
}

//===Types==============================================================================================================

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export type TaskType = UpdatingTaskType & {
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdatingTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}