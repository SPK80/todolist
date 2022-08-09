import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";
import {TaskType} from "../api/todoListsApi";

export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState<TaskType>({
        id: '1',
        title: 'JS',
        completed: true,
        todoListId: "todolistId",
        addedDate: "",
        startDate: "",
        priority: 0,
        deadline: "",
        order: 0,
        description: "",
        status: 0,
        
    })
    
    const changeTaskIsDone = () => {
        const changedTask = {...task, isDone: !task.completed}
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