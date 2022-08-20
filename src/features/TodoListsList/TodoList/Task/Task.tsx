import React, {ChangeEvent, memo} from 'react';
import s from './Task.module.css'
import {EditableSpan} from "../../../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton, LinearProgress} from "@material-ui/core";
import {TaskStatuses} from "../../../../api/todoListsApi";
import {TaskDomainType} from "./tasks-reducer";
import {RequestStatusType} from "../../../../app/appReducer";

type TaskPropsType = {
    task: TaskDomainType
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
        
        
        const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.target.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }
        
        const onDeleteTaskHandler = () => {
            removeTask(task.id)
        }
        
        const confirmHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle)
        }
        
        const className = task.status === TaskStatuses.Completed ? s.taskIsDone : ''
        
        return (
            <div className={className}>
                {(task.entityStatus === RequestStatusType.loading) && <LinearProgress/>}
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    color="primary"
                    onChange={onChangeNewTaskNameHandler}
                    disabled={task.entityStatus === RequestStatusType.loading}
                />
                <IconButton
                    size={"small"}
                    onClick={onDeleteTaskHandler}
                    disabled={task.entityStatus === RequestStatusType.loading}
                >
                    <Delete/>
                </IconButton>
                <EditableSpan
                    value={task.title}
                    confirm={confirmHandler}
                    disabled={task.entityStatus === RequestStatusType.loading}
                />
            </div>
        )
    })