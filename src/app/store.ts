import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todolist-reducer";
import {appReducer} from "./appReducer";
import thunkMiddleware from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;