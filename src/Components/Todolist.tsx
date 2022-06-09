import React from "react";
import {StringInputForm} from "./StringInputForm";
import {Task, TaskType} from "./Task";
import {FiltersPanel, FilterValuesType} from "./FiltersPanel";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, todoListId: string) => void
    changeTaskIsDone: (id: string, value: boolean, todoListId: string) => void
    addNewTask: (newTaskTitle: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    onRemoveTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    
    const toggleFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.todoListId);
    };
    
    const addNewTaskHandler = (newTaskTitle: string) => {
        props.addNewTask(newTaskTitle, props.todoListId)
    };
    
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.todoListId)
    }
    
    const changeTaskIsDoneHandler = (taskId: string, value: boolean) => {
        props.changeTaskIsDone(taskId, value, props.todoListId)
    }
    
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.todoListId)
    }
    
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListId)
    }
    
    return (
        <div>
            <h3 style={{margin: "5px 0"}}>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    onClick={() => props.onRemoveTodoList(props.todoListId)}
                >
                    <Delete/>
                </IconButton>
                
                <EditableSpan
                    value={props.title}
                    confirm={changeTodoListTitle}
                />
            </h3>
            <StringInputForm
                label={"Title"}
                confirm={addNewTaskHandler}
            />
            
            <FiltersPanel
                filterValue={props.filter}
                toggleFilter={toggleFilterHandler}
            />
            
            {
                props.tasks.length
                    ? <>
                        {props.tasks.map(task =>
                            <Task
                                key={task.id}
                                task={task}
                                removeTask={removeTaskHandler}
                                changeTaskIsDone={changeTaskIsDoneHandler}
                                changeTaskTitle={changeTaskTitleHandler}
                            />
                        )}
                    </>
                    : <div>Create your task</div>
            }
        </div>
    )
}