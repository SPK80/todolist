import {todoListsApi, TodoListType} from "../../../api/todoListsApi";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../../app/appReducer";
import {AllActionsType} from "../../../app/store";

//======actions=========================================================================================================

export const removeTodoListAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    id
}) as const

export const removeTodoListTC = (todoListId: string) =>
    (dispatch: Dispatch<AllActionsType>) => {
        dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.loading))
        todoListsApi.deleteTodoList(todoListId)
            .then(res => dispatch(removeTodoListAC(todoListId)))
            .catch((res: string) => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.idle)))
    }

export const addTodoListAC = (todoList: TodoListType) => ({
    type: "ADD-TODOLIST",
    todoList,
}) as const

export const addTodoListTC = (title: string) =>
    (dispatch: Dispatch<AllActionsType>) => {
        dispatch(setAppStatusAC(RequestStatusType.loading))
        todoListsApi.createTodoList(title)
            .then(data => dispatch(addTodoListAC(data.item)))
            .catch(res => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
    }

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) =>
    (dispatch: Dispatch<AllActionsType>) => {
        dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.loading))
        todoListsApi.updateTodoListTitle(todoListId, newTitle)
            .then(res => dispatch(changeTodoListTitleAC(todoListId, newTitle)))
            .catch(res => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.idle)))
    }

export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: "SET-TODOLISTS",
    todoLists
}) as const

export const fetchTodoListsTC = () =>
    (dispatch: Dispatch<AllActionsType>) => {
        dispatch(setAppStatusAC(RequestStatusType.loading))
        todoListsApi.getTodoLists()
            .then(todoLists => todoLists && dispatch(setTodoListsAC(todoLists)))
            .catch(res => dispatch(setAppErrorAC(res)))
            .finally(() => dispatch(setAppStatusAC(RequestStatusType.idle)))
    }

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
}) as const

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    entityStatus
}) as const

//======types===========================================================================================================

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodoListsActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

//======reducer========================================================================================================

export const todoListsReducer = (state: Array<TodolistDomainType> = [], action: TodoListsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        
        case "ADD-TODOLIST":
            const newTodoList: TodolistDomainType = {
                ...action.todoList,
                filter: "all",
                entityStatus: RequestStatusType.idle
            }
            return [...state, newTodoList]
        
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all", entityStatus: RequestStatusType.idle}))
        
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}