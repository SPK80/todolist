import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../features/todoList/bll/todolist-reducer";
import {tasksReducer} from "../features/task/bll/tasks-reducer";
import {appReducer} from "../app/bll/appReducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer
})

const storyBookStore = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) =>
  <Provider store={storyBookStore}>
    {storyFn()}
  </Provider>
