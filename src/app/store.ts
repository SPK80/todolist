import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todolist-reducer";
import {appReducer} from "./appReducer";
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;