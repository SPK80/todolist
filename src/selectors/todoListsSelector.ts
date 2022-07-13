import {AppRootStateType} from "../store";
import {TodoListType} from "../reducers/todolist-reducer";

export const todoListsSelector = (state: AppRootStateType): Array<TodoListType> => state.todoLists