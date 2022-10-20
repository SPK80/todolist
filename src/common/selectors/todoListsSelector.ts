import {AppRootStateType} from "../../app/bll/store";
import {TodolistDomainType} from "../../app/features/todoLists/features/todoList/bll/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<TodolistDomainType> => state.todoLists