import React from "react";
import {Todolist} from "./Components/Todolist";
import {TaskType} from "./Components/Task";
import {FilterValuesType} from "./Components/FiltersPanel";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodoListContainerPropsType = {
    todoList: TodoListType
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeTaskIsDone: (id: string, value: boolean, todoListId: string) => void
    addNewTask: (newTaskTitle: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    onRemoveTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}
export const TodoListContainer: React.FC<TodoListContainerPropsType> = (props) => {
    
    let tasksForTodoList = props.tasks
    
    if (props.todoList.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone);
    }
    if (props.todoList.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone);
    }
    
    return (
        <Todolist
            todoListId={props.todoList.id}
            title={props.todoList.title}
            tasks={tasksForTodoList}
            filter={props.todoList.filter}
            removeTask={props.removeTask}
            changeTaskIsDone={props.changeTaskIsDone}
            addNewTask={props.addNewTask}
            changeFilter={props.changeFilter}
            onRemoveTodoList={props.onRemoveTodoList}
            changeTaskTitle={props.changeTaskTitle}
        />)
}