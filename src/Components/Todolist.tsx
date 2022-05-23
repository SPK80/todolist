import React, {useState} from "react";
import {NewTaskInput} from "./NewTaskInput";
import Task, {TaskType} from "./Task";
import FiltersPanel, {FilterValuesType} from "./FiltersPanel";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    addNewTask: (newTaskTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    
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
    
    return (
        <div>
            <h3>{props.title}</h3>
            <NewTaskInput
                onAddNewTask={AddTaskHandler}
            />
            
            <FiltersPanel
                onToggleFilter={changeFilter}
                filterValue={filter}
            />
            
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