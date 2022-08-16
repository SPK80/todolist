import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {TodoListsActionsType, todoListsReducer} from "../features/TodoListsList/TodoList/todolist-reducer";
import {AppActionsType, appReducer} from "./appReducer";
import thunkMiddleware from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = TodoListsActionsType | TasksActionsType | AppActionsType

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;