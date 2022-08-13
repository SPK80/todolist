import React, {ChangeEvent, memo} from 'react';
import s from './Task.module.css'
import {EditableSpan} from "../../../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskStatuses, TaskType} from "../../../../api/todoListsApi";

type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeTaskStatus: (id: string, value: TaskStatuses) => void
    changeTaskTitle: (id: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(
    ({
         task,
         removeTask,
         changeTaskStatus,
         changeTaskTitle
     }) => {
        console.log('Task', task.title)
        
        const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.target.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }
        
        const onDeleteTaskHandler = () => {
            removeTask(task.id)
        }
        
        const className = task.status === TaskStatuses.Completed ? s.taskIsDone : ''
        
        const confirmHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle)
        }
        
        return (
            <div className={className}>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
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