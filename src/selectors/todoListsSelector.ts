import {AppRootStateType} from "../app/store";
import {TodolistDomainType} from "../features/TodoListsList/TodoList/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<TodolistDomainType> => state.todoLists