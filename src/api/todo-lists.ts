import {instance} from "./instance";

type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
type ResponseType = Array<TodoListType>

export const todoLists = {
    async get() {
        return instance.get<ResponseType>('todo-lists')
            .then(res => res.data)
    },
}