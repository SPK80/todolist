import {AppRootStateType} from "../app/store";
import {DomainTodoListType} from "../features/TodoListsList/TodoList/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<DomainTodoListType> => state.todoLists