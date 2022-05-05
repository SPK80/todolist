import React, {useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    addNewTask: (newTask: TaskType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    console.log('Todolist rerender');

    const [filter, setFilter] = useState<FilterValuesType>('all');
    let tasksForTodoList = props.tasks;

    if (filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.isDone);
    }

    if (filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => !task.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        console.log('changeFilter', value)
        setFilter(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={() => props.addNewTask({id: -1, title: 'Test', isDone: true})}>+</button>
            </div>
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