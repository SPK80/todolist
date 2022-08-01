import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";

export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({
        id: '1',
        title: 'JS',
        isDone: true,
    })
    
    const changeTaskIsDone = () => {
        const changedTask = {...task, isDone: !task.isDone}
        setTask(changedTask)
        action('changeTaskIsDone')(changedTask)
    }
    const changeTaskTitle = (id: string, newTitle: string) => {
        const changedTask = {...task, title: newTitle}
        setTask(changedTask)
        action('changeTaskTitle')(changedTask)
    }
    
    return (
        <Task
            task={task}
            changeTaskTitle={changeTaskTitle}
            changeTaskIsDone={changeTaskIsDone}
            removeTask={args.removeTask}
        />
    )
}

export const TaskStory = Template.bind({});
TaskStory.args = {
    removeTask: action('removeTask')
}