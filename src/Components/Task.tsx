import React, {ChangeEvent} from 'react';
import s from './NewTaskInput.module.css'
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeTaskIsDone: (id: string, value: boolean) => void
}

const Task: React.FC<TaskPropsType> = ({task, removeTask, changeTaskIsDone}) => {
    
    const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskIsDone(task.id, e.target.checked)
    };
    
    const onDeleteTaskHandler = () => {
        removeTask(task.id)
    };
    
    const className = task.isDone ? s.taskIsDone:''
    
    return (
        <li className={className}>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeNewTaskNameHandler}
            />
            <button onClick={onDeleteTaskHandler}>X</button>
            <span>{task.title}</span>
        </li>
    )
    
};

export default Task;