import {Provider} from "react-redux";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../reducers/todolist-reducer";
import {TasksActionsType, TasksStateType} from "../reducers/tasks-reducer";

const initialState = {
    ['1']: []
}

const storyTasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    return state
}

const rootReducer = combineReducers({
    tasks: storyTasksReducer,
    todoLists: todoListsReducer

})

const storyBookStore = legacy_createStore(rootReducer)

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) =>
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>