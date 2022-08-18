import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../features/TodoListsList/TodoList/todolist-reducer";
import {TasksActionsType, TasksStateType} from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import {appReducer} from "../app/appReducer";
import thunkMiddleware from "redux-thunk";

const initialState = {
    ['1']: []
}

const storyTasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    return state
}

const rootReducer = combineReducers({
    tasks: storyTasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) =>
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>