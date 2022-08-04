import {AppRootStateType} from "../store";
import {DomainTodoListType} from "../reducers/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<DomainTodoListType> => state.todoLists