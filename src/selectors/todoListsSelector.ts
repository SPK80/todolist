import {AppRootStateType} from "../store";
import {TodoListType} from "../TodoListContainer";

export const todoListsSelector = (state: AppRootStateType): Array<TodoListType> => state.todoLists