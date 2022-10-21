import {Dispatch} from "redux";
import {AllActionsType, AppRootStateType} from "app/bll/store";
import {RequestStatusType, setAppErrorAC} from "app/bll/appReducer";
import {tasksApi, TaskStatuses, TaskType} from "../dal/tasksApi";
import {
  addTodoListAC,
  changeTodolistEntityStatusAC,
  removeTodoListAC,
  setTodoListsAC
} from "../../../bll/todolist-reducer";

//======actions=========================================================================================================

export const addTaskAC = (task: TaskType) => ({
  type: "ADD-TASK",
  task
}) as const

export const createTaskTC = (newTaskTitle: string, todoListId: string) =>
  (dispatch: Dispatch<AllActionsType>) => {
    dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.loading))
    tasksApi.createTask(todoListId, newTaskTitle)
      .then(res => dispatch(addTaskAC(res.item)))
      .catch(res => dispatch(setAppErrorAC(res)))
      .finally(() => dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.idle)))
  }

export const removeTaskAC = (taskId: string, todolistId: string) => ({
  type: "REMOVE-TASK",
  taskId: taskId,
  todoListId: todolistId
}) as const

export const removeTaskTC = (taskId: string, todoListId: string) =>
  (dispatch: Dispatch<AllActionsType>) => {
    dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.loading))
    tasksApi.removeTask(taskId, todoListId)
      .then(res => dispatch(removeTaskAC(taskId, todoListId)))
      .catch(res => dispatch(setAppErrorAC(res)))
      .finally(() => dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.idle)))
  }

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => ({
  type: "CHANGE-TASK-STATUS",
  taskId,
  status,
  todoListId
}) as const

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todoListId: string) =>
  (dispatch: Dispatch<AllActionsType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    if (!task) return console.log('Error at changing task status. task not found', 'taskId:', taskId, 'todoListId:', todoListId)
    dispatch(changeTaskEntityStatusAC(taskId, RequestStatusType.loading, todoListId))
    tasksApi.updateTask(taskId, todoListId, {...task, status,})
      .then(res => dispatch(changeTaskStatusAC(taskId, status, todoListId)))
      .catch(res => dispatch(setAppErrorAC(res)))
      .finally(() => dispatch(changeTaskEntityStatusAC(taskId, RequestStatusType.idle, todoListId)))
  }

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
  type: "CHANGE-TASK-TITLE",
  taskId,
  title,
  todoListId
}) as const

export const changeTaskTitleTC = (taskId: string, todoListId: string, newTitle: string) =>
  (dispatch: Dispatch<AllActionsType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    if (!task) return console.log('Error at changing task status. task not found', 'taskId:', taskId, 'todoListId:', todoListId)
    dispatch(changeTaskEntityStatusAC(taskId, RequestStatusType.loading, todoListId))
    tasksApi.updateTask(taskId, todoListId, {...task, title: newTitle})
      .then(res => dispatch(changeTaskTitleAC(taskId, newTitle, todoListId)))
      .catch(res => dispatch(setAppErrorAC(res)))
      .finally(() => dispatch(changeTaskEntityStatusAC(taskId, RequestStatusType.idle, todoListId)))
  }

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => ({
  type: "SET-TASKS",
  tasks,
  todoListId,
}) as const

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<AllActionsType>) => {
  dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.loading))
  tasksApi.getTasks(todoListId)
    .then(res => dispatch(setTasksAC(res.items, todoListId)))
    .catch(res => dispatch(setAppErrorAC(res)))
    .finally(() => dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.idle)))
}

export const changeTaskEntityStatusAC = (taskId: string, entityStatus: RequestStatusType, todoListId: string) => ({
  type: "CHANGE-TASK-ENTITY-STATUS",
  taskId,
  todoListId,
  entityStatus
}) as const


//======types===========================================================================================================

export type TasksActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof setTodoListsAC>
  | ReturnType<typeof changeTaskEntityStatusAC>

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

export type TasksStateType = {
  [id: string]: Array<TaskDomainType>
}

//=====reducer==========================================================================================================

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          {...action.task, entityStatus: RequestStatusType.idle},
          ...state[action.task.todoListId]
        ]
      }
    
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
      }
    
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t =>
          t.id === action.taskId ? {...t, status: action.status} : t)
      }
    
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t =>
          t.id === action.taskId ? {...t, title: action.title} : t)
      }
    case "ADD-TODOLIST":
      return {
        ...state, [action.todoList.id]: []
      }
    
    case "REMOVE-TODOLIST": {
      const newState = {...state}
      delete newState[action.id]
      return newState
    }
    
    case "SET-TODOLISTS": {
      const newState = {...state}
      action.todoLists.forEach(tl => newState[tl.id] = [])
      return newState
    }
    
    case "SET-TASKS": {
      return {
        ...state,
        [action.todoListId]: action.tasks.map(t => ({...t, entityStatus: RequestStatusType.idle}))
      }
    }
    
    case "CHANGE-TASK-ENTITY-STATUS":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t =>
          t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
      }
    
    default:
      return state
  }
}
