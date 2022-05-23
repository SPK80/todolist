import React from "react";
import {NewTaskInput} from "./NewTaskInput";
import Task, {TaskType} from "./Task";
import FiltersPanel, {FilterValuesType} from "./FiltersPanel";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    addNewTask: (newTaskTitle: string) => void
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => void
}

const Todolist: React.FC<TodolistPropsType> = (props) => {
    
    let tasksForTodoList = props.tasks;
    
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.isDone);
    }
    
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => !task.isDone);
    }
    
    function toggleFilterHandler(value: FilterValuesType) {
        props.changeFilter(value);
    }
    
    function addNewTaskHandler(newTaskTitle: string) {
        props.addNewTask(newTaskTitle)
    }
    
    return (
        <div>
            <h3>{props.title}</h3>
            <NewTaskInput
                addNewTask={addNewTaskHandler}
            />
            
            <FiltersPanel
                filterValue={props.filter}
                toggleFilter={toggleFilterHandler}
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
export default Todolist;