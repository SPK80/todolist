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
        todoListsApi.deleteTodoList(todoListId).then(res =>
            dispatch(removeTodoListAC(todoListId)))
            .catch(reason => console.error(reason))
    }

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
}) as const

export const addTodoListAC = (todoList: TodoListType) => ({
    type: "ADD-TODOLIST",
    todoList,
}) as const

export const addTodoListTC = (title: string) =>
    (dispatch: Dispatch<AllActionsType>) => {
        todoListsApi.createTodoList(title).then(data => {
            dispatch(addTodoListAC(data.item))
        })
    }

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) =>
    (dispatch: Dispatch<AllActionsType>) => {
        todoListsApi.updateTodoListTitle(todoListId, newTitle)
            .then(res => dispatch(changeTodoListTitleAC(todoListId, newTitle)))
            .catch(reason => console.error(reason))
    }

export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({
    type: "SET-TODOLISTS",
    todoLists
}) as const

export const fetchTodoListsTC = () =>
    (dispatch: Dispatch<AllActionsType>) => {
        dispatch(setAppStatusAC(RequestStatusType.loading))
        todoListsApi.getTodoLists()
            .then(todoLists => {
                todoLists && dispatch(setTodoListsAC(todoLists))
                dispatch(setAppStatusAC(RequestStatusType.succeeded))
            })
            .catch(res => {
                dispatch(setAppStatusAC(RequestStatusType.failed))
                dispatch(setAppErrorAC(res)) //console.error(res)
            })
    }

//======types===========================================================================================================

export type FilterValuesType = 'all' | 'completed' | 'active';

export type DomainTodoListType = TodoListType & {
    filter: FilterValuesType
}

export type TodoListsActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof setTodoListsAC>

//======reducer========================================================================================================

export const todoListsReducer = (state: Array<DomainTodoListType> = [], action: TodoListsActionsType): Array<DomainTodoListType> => {
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