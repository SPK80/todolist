import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from "../features/TodoListsList/tasks-reducer";
import {todoListsReducer} from "../features/TodoListsList/todolist-reducer";
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;