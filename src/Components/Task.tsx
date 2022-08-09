import React, {ChangeEvent, memo} from 'react';
import s from './Task.module.css'
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskType} from "../api/todoListsApi";

type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(
    ({
         task,
         removeTask,
         changeTaskIsDone,
         changeTaskTitle
     }) => {
        console.log('Task', task.title)
        
        const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskIsDone(task.id, e.target.checked)
        }
        
        const onDeleteTaskHandler = () => {
            removeTask(task.id)
        }
        
        const className = task.completed ? s.taskIsDone : ''
        
        const confirmHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle)
        }
        
        return (
            <div className={className}>
                <Checkbox
                    checked={task.completed}
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
            </div>
        )
    })