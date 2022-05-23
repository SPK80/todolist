import React, {useState} from "react";
import {NewTaskTitle} from "./NewTaskTitle";
import Task, {TaskType} from "./Task";
import FilterButton, {FilterValuesType} from "./FilterButton";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    addNewTask: (newTaskTitle: string) => void
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

    function AddTaskHandler(newTaskTitle: string) {
        props.addNewTask(newTaskTitle)
    }

    console.log(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <NewTaskTitle
                onAddNewTask={AddTaskHandler}
            />
            <div>
                <FilterButton
                    value={"all"}
                    onToggle={changeFilter}
                    active={filter === "all"}
                />
                <FilterButton
                    value={"active"}
                    onToggle={changeFilter}
                    active={filter === "active"}

                />
                <FilterButton
                    value={"completed"}
                    onToggle={changeFilter}
                    active={filter === "completed"}

                />
                {/*<button onClick={() => changeFilter('all')}>All</button>*/}
                {/*<button onClick={() => changeFilter('active')}>Active</button>*/}
                {/*<button onClick={() => changeFilter('completed')}>Completed</button>*/}
            </div>
            <ul>
                {tasksForTodoList.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            removeTask={props.removeTask}
                            changeTaskIsDone={props.changeTaskIsDone}
                        />
                    )
                )}
            </ul>
        </div>
    )
}