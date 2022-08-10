import {todoListsApi, TodoListType} from "../api/todoListsApi";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type DomainTodoListType = TodoListType & {
    filter: FilterValuesType
}

export const removeTodoListAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    id
}) as const

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
}) as const

type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>

export const addTodoListAC = (todoList: TodoListType) => ({
    type: "ADD-TODOLIST",
    todoList,
}) as const

export type AddTodoListAT = ReturnType<typeof addTodoListAC>

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const

type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>

export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: "SET-TODOLISTS",
    todoLists
}) as const

export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>

export const fetchTodoListsTC = () =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        todoListsApi.getTodoLists()
            .then(todoLists => todoLists && dispatch(setTodoListsAC(todoLists)))
            .catch(res => console.log(res))
    }

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SetTodoListsAT

const initialState: Array<DomainTodoListType> = []

export const todoListsReducer = (state: Array<DomainTodoListType> = initialState, action: ActionType): Array<DomainTodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        
        case "ADD-TODOLIST":
            const newTodoList: DomainTodoListType = {
                ...action.todoList,
                filter: "all",
            }
            return [...state, newTodoList]
        
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        
        default:
            return state
    }
}