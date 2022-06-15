import {TaskStateType} from "../App";

type AddNewTaskAT = {
    type: "ADD-TASK"
    taskId: string
    title: string
    todolistId: string
}

export const AddNewTaskAC = (taskId: string, title: string, todolistId: string): AddNewTaskAT => ({
    type: "ADD-TASK",
    taskId,
    title,
    todolistId
})

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => ({
    type: "REMOVE-TASK",
    taskId: taskId,
    todoListId: todolistId
})

type ChangeTaskIsDoneAT = {
    type: "CHANGE-TASK-IS-DONE"
    taskId: string
    isDone: boolean
    todoListId: string
}

export const ChangeTaskIsDoneAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskIsDoneAT => ({
    type: "CHANGE-TASK-IS-DONE",
    taskId,
    isDone,
    todoListId
})

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleAT => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    title,
    todoListId
})


type ActionType = AddNewTaskAT | RemoveTaskAT | ChangeTaskIsDoneAT | ChangeTaskTitleAT;

export const tasksReducer = (allTasks: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...allTasks,
                [action.todolistId]: [
                    ...allTasks[action.todolistId],
                    {id: action.taskId, title: action.title, isDone: false}
                ]
            }
        
        case "REMOVE-TASK":
            return {
                ...allTasks,
                [action.todoListId]: allTasks[action.todoListId].filter(task => task.id !== action.taskId)
            }
        
        case "CHANGE-TASK-IS-DONE":
            return {
                ...allTasks,
                [action.todoListId]: allTasks[action.todoListId].map(t =>
                    t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        
        case "CHANGE-TASK-TITLE":
            return {
                ...allTasks,
                [action.todoListId]: allTasks[action.todoListId].map(t =>
                    t.id === action.taskId ? {...t, title: action.title} : t)
            }
        
        default:
            return allTasks
    }
}