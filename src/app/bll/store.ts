import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TasksActionsType, tasksReducer} from "features/task/bll/tasks-reducer";
import {TodoListsActionsType, todoListsReducer} from "features/todoList/bll/todolist-reducer";
import {AppActionsType, appReducer} from "./appReducer";
import thunkMiddleware from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../../features/login/bll/authReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = TodoListsActionsType | TasksActionsType | AppActionsType

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
