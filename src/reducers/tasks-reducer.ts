import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolist-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type AddNewTaskAT = ReturnType<typeof addTaskAC>

export const addTaskAC = (newTaskId: string, title: string, todolistId: string) => ({
    type: "ADD-TASK",
    newTaskId,
    title,
    todolistId
}) as const

type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId: taskId,
    todoListId: todolistId
}) as const

type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    isDone,
    todoListId
}) as const

type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todoListId
}) as const


export type TasksActionsType = AddNewTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {id: action.newTaskId, title: action.title, isDone: false},
                    ...state[action.todolistId]
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
                ...state, [action.id]: []
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

        default:
            return state
    }
}