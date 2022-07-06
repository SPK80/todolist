import React from "react";
import {StringInputForm} from "./StringInputForm";
import {Task, TaskType} from "./Task";
import {FiltersPanel, FilterValuesType} from "./FiltersPanel";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../reducers/tasks-reducer";
import {v1} from "uuid";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "../reducers/todolist-reducer";

type TodolistPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const dispatch = useDispatch()

    const toggleFilterHandler = (newFilter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(props.todoListId, newFilter))
        // props.changeFilter(value, props.todoListId);
    };

    const addNewTaskHandler = (newTaskTitle: string) => {
        dispatch(addTaskAC(v1(), newTaskTitle, props.todoListId))
        // props.addNewTask(newTaskTitle, props.todoListId)
    };

    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(taskId, props.todoListId))
        // props.removeTask(taskId, props.todoListId)
    }

    const changeTaskIsDoneHandler = (taskId: string, value: boolean) => {
        dispatch(changeTaskStatusAC(taskId, value, props.todoListId))
        // props.changeTaskIsDone(taskId, value, props.todoListId)
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, props.todoListId))
        // props.changeTaskTitle(taskId, newTitle, props.todoListId)
    }

    const changeTodoListTitle = (newTitle: string) => {
        dispatch(changeTodoListTitleAC(props.todoListId, newTitle))
        // props.changeTodoListTitle(newTitle, props.todoListId)
    }

    const removeTodoList = () => {
        dispatch(removeTodoListAC(props.todoListId))
        // props.onRemoveTodoList(props.todoListId)
    }

    return (
        <div>
            <h3 style={{margin: "5px 0"}}>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    onClick={removeTodoList}
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