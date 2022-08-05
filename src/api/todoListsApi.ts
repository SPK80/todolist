import {instance} from "./instance";
import {parseResponse, ResponseType} from "./parseResponse";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
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
        return instance.delete<ResponseType<{ item: TodoListType }>>(`todo-lists/${todolistId}`)
            .then(parseResponse)
    },


}