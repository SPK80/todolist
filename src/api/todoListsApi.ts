import {instance} from "./instance";
import {parseResponse, ResponseType} from "./parseResponse";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export const todoListsApi = {
    
    async getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists')
            .then(res => res.data)
    },
    
    async createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
            .then(parseResponse)
    },
    
    async deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then(parseResponse)
    },
    
    async changeTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
            .then(parseResponse)
    },
    
    async getTasks(todolistId: string, count?: number, page?: number) {
        // const params = {} as { count?: number, page?: number }
        // if (count) params.count = count
        // if (page) params.page = page
        return instance.get<ResponseType<ResponseTasksType>>(`todo-lists/${todolistId}/tasks`)
            .then(parseResponse)
    },
    
    async createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(parseResponse)
    },
    
}