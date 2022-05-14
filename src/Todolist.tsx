import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {NewTaskTitle} from "./NewTaskTitle";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    addNewTask: (newTaskTitle: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    
    const [filter, setFilter] = useState<FilterValuesType>('all');
    let tasksForTodoList = props.tasks;
    
    if (filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.isDone);
    }
    
    if (filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => !task.isDone);
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    
    function onChangeTaskTitleHandler(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.currentTarget.value)
    }
    
    function AddTaskHandler() {
        props.addNewTask(newTaskTitle)
        setNewTaskTitle('')
    }
    
    return (
        <div>
            <h3>{props.title}</h3>
            <NewTaskTitle
                newTaskTitle={newTaskTitle}
                onClickButton={AddTaskHandler}
                onChangeInput={onChangeTaskTitleHandler}
            />
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
            <ul>
                {tasksForTodoList.map(task => {
                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => props.changeTaskIsDone(task.id, e.target.checked)}
                            />
                            <button onClick={() => props.removeTask(task.id)}>X</button>
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}