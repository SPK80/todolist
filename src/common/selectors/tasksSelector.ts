import {AppRootStateType} from "app/bll/store";
import {TaskType} from "features/task/dal/tasksApi";

export const tasksSelector = (todoListId: string) =>
  (state: AppRootStateType): Array<TaskType> =>
    state.tasks[todoListId]
