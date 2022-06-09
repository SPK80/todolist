import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> =
    ({
         task,
         removeTask,
         changeTaskIsDone,
         changeTaskTitle
     }) => {
        
        const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskIsDone(task.id, e.target.checked)
        }
        
        const onDeleteTaskHandler = () => {
            removeTask(task.id)
        }
        
        const className = task.isDone ? s.taskIsDone : ''
        
        const confirmHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle)
        }
        
        return (
            <li className={className}>
                <Checkbox
                    checked={task.isDone}
                    color="primary"
                    onChange={onChangeNewTaskNameHandler}
                />
                <IconButton
                    size={"small"}
                    onClick={onDeleteTaskHandler}
                >
                    <Delete/>
                </IconButton>
                <EditableSpan
                    value={task.title}
                    confirm={confirmHandler}
                />
            </li>
        )
    }