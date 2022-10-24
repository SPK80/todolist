import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {useAppSelector} from "app/bll/store";
import {TodoList} from "features/todoList";
import {AddTodoListForm} from "./AddTodoListForm";
import {RequestStatusType} from "app/bll/appReducer";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchTodoListsTC} from "../../todoList/bll/todolist-reducer";

export const TodoListsList: React.FC = () => {
  const todoLists = useAppSelector(state => state.todoLists)
  const requestStatus = useAppSelector(state => state.app.status)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(fetchTodoListsTC())
  }, [])
  
  if (!isLoggedIn) return <Navigate to={'/login'}/>
  return (
    <>
      <Grid container style={{margin: "20px 0 20px"}}>
        <Paper style={{padding: "10px"}}>
          <AddTodoListForm disabled={requestStatus === RequestStatusType.loading}/>
        </Paper>
      </Grid>
      <Grid container spacing={3}>
        {
          (todoLists.length)
            ? todoLists.map(todoList =>
              <Grid item key={todoList.id}>
                <Paper style={{padding: "10px"}}>
                  <TodoList todoList={todoList}/>
                </Paper>
              </Grid>
            )
            : (<span>Create your 1st todo list</span>)
        }
      </Grid>
    </>
  )
  
}
