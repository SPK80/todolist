import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";
import {TaskStatuses, TaskType} from "../api/todoListsApi";

export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState<TaskType>({
        id: '1',
        title: 'JS',
        todoListId: "todolistId",
        addedDate: "",
        startDate: "",
        priority: 0,
        deadline: "",
        order: 0,
        description: "",
        status: TaskStatuses.New,
        
    })
    
    const changeTaskIsDone = () => {
        const changedTask = {...task, isDone: !task.status}
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
            changeTaskStatus={changeTaskIsDone}
            removeTask={args.removeTask}
        />
    )
}

export const TaskStory = Template.bind({});
TaskStory.args = {
    removeTask: action('removeTask')
}