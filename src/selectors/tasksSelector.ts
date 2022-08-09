import {AppRootStateType} from "../store";
import {TaskType} from "../api/todoListsApi";

export const tasksSelector = (todoListId: string) =>
    (state: AppRootStateType): Array<TaskType> =>
        state.tasks[todoListId]