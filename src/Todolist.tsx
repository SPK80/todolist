import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  changeTaskIsDone: (id: number, value: boolean) => void
  addNewTask: (newTaskTitle: string) => void
}

export type TaskType = {
	id: number,
	title: string,
	isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
  console.log('Todolist rerender');
  
  const [filter, setFilter] = useState<FilterValuesType>('all');
  let tasksForTodoList = props.tasks;
  
  if (filter === 'completed') {
    tasksForTodoList = props.tasks.filter(task => task.isDone);
  }
  
  if (filter === 'active') {
    tasksForTodoList = props.tasks.filter(task => !task.isDone);
  }
  
  function changeFilter(value: FilterValuesType) {
    console.log('changeFilter', value)
    setFilter(value);
  }
  
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  
  function onChangeInputTaskTitleHandler(event:ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.currentTarget.value)
  }
  
  function onClickButtonAddTaskHandler() {
    props.addNewTask(newTaskTitle)
    setNewTaskTitle('')
  }
  
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onChangeInputTaskTitleHandler}/>
        <button onClick={onClickButtonAddTaskHandler}>+</button>
      </div>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
      <ul>
        {tasksForTodoList.map(task => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e)=>props.changeTaskIsDone(task.id, e.target.checked)}
              />
              <button onClick={() => props.removeTask(task.id)}>X</button>
              <span>{task.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}