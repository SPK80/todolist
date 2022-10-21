import React, {useCallback} from 'react'
import {AddItemForm} from "common/components/AddItemForm";
import {addTodoListTC} from "../features/todoList/bll/todolist-reducer";
import {useDispatch} from "react-redux";

export const AddTodoListForm: React.FC<{ disabled?: boolean }> = ({disabled}) => {
  const dispatch = useDispatch()
  
  const addNewTodoList = useCallback((title: string) =>
      dispatch(addTodoListTC(title))
    , [])
  
  return (
    <AddItemForm
      label={"New Todo List"}
      confirm={addNewTodoList}
      disabled={disabled}
    />
  )
}
