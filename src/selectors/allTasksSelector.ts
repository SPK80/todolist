import {AppRootStateType} from "../store";
import {TasksStateType} from "../App";

export const allTasksSelector = (state: AppRootStateType): TasksStateType => state.tasks