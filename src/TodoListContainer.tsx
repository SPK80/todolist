import React, {memo} from "react";
import {Todolist} from "./Components/Todolist";
import {TaskType} from "./Components/Task";
import {FilterValuesType} from "./Components/FiltersPanel";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodoListContainerPropsType = {
    todoList: TodoListType
}

export const TodoListContainer = memo<TodoListContainerPropsType>((props) => {
    console.log('TodoListContainer')
    let tasksForTodoList = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id])

    if (props.todoList.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(task => task.isDone);
    if (props.todoList.filter === 'active') tasksForTodoList = tasksForTodoList.filter(task => !task.isDone);

    return (
        <Todolist
            todoListId={props.todoList.id}
            title={props.todoList.title}
            tasks={tasksForTodoList}
            filter={props.todoList.filter}
        />)
})