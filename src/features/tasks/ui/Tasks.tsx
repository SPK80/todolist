import React, {useCallback} from "react";
import {Task} from "features/task";
import {useAppSelector} from "app/bll/store";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "features/task/dal/tasksApi";
import {FilterValuesType} from "features/todoList/bll/todolist-reducer";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "features/task/bll/tasks-reducer";

type PropsType = {
  todoListId: string
  filter: FilterValuesType
}

export const Tasks: React.FC<PropsType> = ({todoListId, filter}) => {
  let tasksForTodoList = useAppSelector(state => state.tasks[todoListId])
  const dispatch = useDispatch()
  if (filter === 'completed') tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed);
  if (filter === 'active') tasksForTodoList = tasksForTodoList.filter(task => task.status !== TaskStatuses.Completed);
  
  const removeTaskHandler = useCallback((taskId: string) =>
      dispatch(removeTaskTC(taskId, todoListId))
    , [])
  
  const changeTaskStatusHandler = useCallback((taskId: string, value: TaskStatuses) =>
      dispatch(changeTaskStatusTC(taskId, value, todoListId))
    , [])
  
  const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleTC(taskId, todoListId, newTitle))
  }, [])
  
  if (tasksForTodoList.length)
    return (
      <>
        {tasksForTodoList.map(task =>
          <Task
            key={task.id}
            task={task}
            removeTask={removeTaskHandler}
            changeTaskStatus={changeTaskStatusHandler}
            changeTaskTitle={changeTaskTitleHandler}
          />
        )}
      </>
    )
  else return <div>Create your task</div>
}
