import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "common/components/AddItemForm";
import {FiltersPanel} from "common/components/FiltersPanel";
import {EditableSpan} from "common/components/EditableSpan";
import {IconButton, LinearProgress} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {createTaskTC, fetchTasksTC,} from "features/task/bll/tasks-reducer";
import {
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  FilterValuesType,
  removeTodoListTC,
  TodolistDomainType
} from "../bll/todolist-reducer";
import {RequestStatusType} from "app/bll/appReducer";
import {Tasks} from "features/tasks";

type TodolistPropsType = {
  todoList: TodolistDomainType,
}

export const TodoList: React.FC<TodolistPropsType> = memo(({todoList}) => {
  
  const dispatch = useDispatch()
  
  //fetch Tasks of this todoList
  useEffect(() => {
    dispatch(fetchTasksTC(todoList.id))
  }, [])
  
  const toggleFilterHandler = useCallback((newFilter: FilterValuesType) =>
      dispatch(changeTodoListFilterAC(todoList.id, newFilter))
    , [])
  
  const addNewTaskHandler = useCallback((newTaskTitle: string) =>
      dispatch(createTaskTC(newTaskTitle, todoList.id))
    , [])
  
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
      
      <Tasks
        todoListId={todoList.id}
        filter={todoList.filter}
      />
    </div>
  )
})
