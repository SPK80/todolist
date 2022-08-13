import {AppRootStateType} from "../app/store";
import {TaskType} from "../api/todoListsApi";

export const tasksSelector = (todoListId: string) =>
    (state: AppRootStateType): Array<TaskType> =>
        state.tasks[todoListId]