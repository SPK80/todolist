import {AppRootStateType} from "../../app/bll/store";
import {TaskType} from "../dal/todoListsApi";

export const tasksSelector = (todoListId: string) =>
    (state: AppRootStateType): Array<TaskType> =>
        state.tasks[todoListId]