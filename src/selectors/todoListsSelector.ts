import {AppRootStateType} from "../app/store";
import {DomainTodoListType} from "../features/TodoListsList/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<DomainTodoListType> => state.todoLists