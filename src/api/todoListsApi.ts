import {instance} from "./instance";

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
}