import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolist-reducer";
import {TaskType, todoListsApi, UpdatingTaskType} from "../api/todoListsApi";
import {Dispatch} from "redux";

//=======addTask========================================================================================================
type AddNewTaskAT = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task
}) as const

export const createTaskTC = (newTaskTitle: string, todoListId: string) =>
    (dispatch: Dispatch<TasksActionsType>) => {
        todoListsApi.createTask(todoListId, newTaskTitle)
            .then(res => dispatch(addTaskAC(res.item)))
    }

//======================================================================================================================

//=======removeTask=====================================================================================================
type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId: taskId,
    todoListId: todolistId
}) as const

export const removeTaskTC = (taskId: string, todoListId: string) =>
    (dispatch: Dispatch<TasksActionsType>) => {
        todoListsApi.removeTask(taskId, todoListId)
            .then(res => {
                console.log('removeTask', res)
                dispatch(removeTaskAC(taskId, todoListId))
            })
    }
//======================================================================================================================

//=======changeTaskStatus===============================================================================================
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todoListId
}) as const

export const updateTaskTC = (taskId: string, todoListId: string, updatedTaskData: UpdatingTaskType) =>
    (dispatch: Dispatch<TasksActionsType>) => {
        // const task = getState().tasks[todoListId].find(t => t.id === taskId)
        // if (!task) return
        // const updatedTaskData: UpdatingTaskType = {
        //     title: task.title,
        //     description: task.description,
        //     completed,
        //     status: task.status,
        //     priority: task.priority,
        //     startDate: task.startDate,
        //     deadline: task.deadline,
        // }
        todoListsApi.updateTask(taskId, todoListId, updatedTaskData)
            .then(res => {
                console.log('updateTask', res)
                // dispatch(changeTaskStatusAC(taskId, completed, todoListId))
            })
    }
//======================================================================================================================

//=======changeTaskTitle================================================================================================
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todoListId
}) as const
//======================================================================================================================

//=======setTasks=======================================================================================================
type SetTasksAT = ReturnType<typeof setTasksAC>

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => ({
    type: "SET-TASKS",
    tasks,
    todoListId,
}) as const

export const fetchTasksTC = (todoListId: string) =>
    (dispatch: Dispatch<TasksActionsType>) => {
        todoListsApi.getTasks(todoListId)
            .then(res => dispatch(setTasksAC(res.items, todoListId)))
            .catch(res => console.log(res))
    }
//======================================================================================================================


export type TasksActionsType =
    | AddNewTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT
    | SetTasksAT

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [
                    action.task,
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
                    t.id === action.taskId ? {...t, isDone: action.isDone} : t)
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
            action.todoLists.forEach(tl => {
                newState[tl.id] = []
            })
            return newState
        }

        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        }

        default:
            return state
    }
}