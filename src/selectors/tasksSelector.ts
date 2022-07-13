import {AppRootStateType} from "../store";
import {TaskType} from "../reducers/tasks-reducer";

export const tasksSelector = (todoListId: string) =>
    (state: AppRootStateType): Array<TaskType> =>
        state.tasks[todoListId]
