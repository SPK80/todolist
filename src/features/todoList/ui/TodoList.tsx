import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "common/components/AddItemForm";
import {FiltersPanel} from "common/components/FiltersPanel";
import {EditableSpan} from "common/components/EditableSpan";
import {IconButton, LinearProgress} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {
  changeTaskStatusTC,
  changeTaskTitleTC,
  createTaskTC,
  fetchTasksTC,
  removeTaskTC,
} from "features/task/bll/tasks-reducer";
import {
  TodolistDomainType,
  FilterValuesType,
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  removeTodoListTC
} from "../bll/todolist-reducer";
import {useAppSelector} from "app/bll/store";
import {RequestStatusType} from "app/bll/appReducer";
import {TaskStatuses} from "features/task/dal/tasksApi";
import {Task} from "features/task";

type TodolistPropsType = {
  todoList: TodolistDomainType,
}

export const TodoList: React.FC<TodolistPropsType> = memo(({todoList}) => {
  
  let tasksForTodoList = useAppSelector(state => state.tasks[todoList.id])
  const dispatch = useDispatch()
  
  //fetch Tasks of this todoList
  useEffect(() => {
    dispatch(fetchTasksTC(todoList.id))
  }, [])
  
  if (todoList.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed);
  if (todoList.filter === 'active') tasksForTodoList = tasksForTodoList.filter(task => task.status !== TaskStatuses.Completed);
  
  const toggleFilterHandler = useCallback((newFilter: FilterValuesType) =>
      dispatch(changeTodoListFilterAC(todoList.id, newFilter))
    , [])
  
  const addNewTaskHandler = useCallback((newTaskTitle: string) =>
      dispatch(createTaskTC(newTaskTitle, todoList.id))
    , [])
  
  const removeTaskHandler = useCallback((taskId: string) =>
      dispatch(removeTaskTC(taskId, todoList.id))
    , [])
  
  const changeTaskStatusHandler = useCallback((taskId: string, value: TaskStatuses) =>
      dispatch(changeTaskStatusTC(taskId, value, todoList.id))
    , [])
  
  const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleTC(taskId, todoList.id, newTitle))
  }, [])
  
  const changeTodoListTitle = (newTitle: string) => {
    dispatch(changeTodoListTitleTC(todoList.id, newTitle))
  }
  
  const removeTodoList = () => {
    dispatch(removeTodoListTC(todoList.id))
  }
  
  return (
    <div>
      {(todoList.entityStatus === RequestStatusType.loading) && <LinearProgress/>}
      <h3 style={{margin: "5px 0"}}>
        <IconButton
          color={"secondary"}
          size={"small"}
          onClick={removeTodoList}
          disabled={todoList.entityStatus === RequestStatusType.loading}
        >
          <Delete/>
        </IconButton>
        
        <EditableSpan
          value={todoList.title}
          confirm={changeTodoListTitle}
        />
      </h3>
      <AddItemForm
        label={"Title"}
        confirm={addNewTaskHandler}
        disabled={todoList.entityStatus === RequestStatusType.loading}
      />
      
      <FiltersPanel
        filterValue={todoList.filter}
        toggleFilter={toggleFilterHandler}
      />
      
      {
        tasksForTodoList.length
          ? <>
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
          : <div>Create your task</div>
      }
    </div>
  )
})
