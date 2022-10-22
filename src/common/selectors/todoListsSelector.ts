import {AppRootStateType} from "app/bll/store";
import {TodolistDomainType} from "features/todoList/bll/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<TodolistDomainType> => state.todoLists
