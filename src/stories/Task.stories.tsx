import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {TaskDomainType} from "app/features/todoLists/features/todoList/features/task/bll/tasks-reducer";
import {RequestStatusType} from "app/bll/appReducer";
import {Task} from "app/features/todoLists/features/todoList/features/task";
import {TaskStatuses} from "app/features/todoLists/features/todoList/features/task/dal/tasksApi";

export default {
  title: 'todoList/task',
  component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
  const [task, setTask] = useState<TaskDomainType>({
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
    entityStatus: RequestStatusType.idle,
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
