import React from "react";
import {NewTaskInput} from "./NewTaskInput";
import Task, {TaskType} from "./Task";
import FiltersPanel, {FilterValuesType} from "./FiltersPanel";

type TodolistPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todoListId: string) => void
    changeTaskIsDone: (id: string, value: boolean, todoListId: string) => void
    addNewTask: (newTaskTitle: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
}

const Todolist: React.FC<TodolistPropsType> = (props) => {
    
    
    function toggleFilterHandler(value: FilterValuesType) {
        props.changeFilter(value, props.todoListId);
    }
    
    function addNewTaskHandler(newTaskTitle: string) {
        props.addNewTask(newTaskTitle, props.todoListId)
    }
    
    
    function removeTaskHandler(taskId: string) {
        props.removeTask(taskId, props.todoListId)
    }
    
    function changeTaskIsDoneHandler(taskId: string, value: boolean) {
        props.changeTaskIsDone(taskId, value, props.todoListId)
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
                {props.tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            removeTask={removeTaskHandler}
                            changeTaskIsDone={changeTaskIsDoneHandler}
                        />
                    )
                )}
            </ul>
        </div>
    )
}
export default Todolist;