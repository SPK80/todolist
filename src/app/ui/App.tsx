import React, {useEffect} from 'react';
import './App.css';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {fetchTodoListsTC} from "features/todoList/bll/todolist-reducer";
import {useDispatch} from "react-redux";
import {AddTodoListForm, TodoListsList} from "features/todoLists";
import {useAppSelector} from "../bll/store";
import {RequestStatusType} from "../bll/appReducer";
import {ErrorSnackbar} from "common/components/ErrorSnackbar";

export const App = () => {
  const requestStatus = useAppSelector(state => state.app.status)
  const dispatch = useDispatch()
  
  //fetch TodoLists
  useEffect(() => {
    dispatch(fetchTodoListsTC())
  }, [])
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h5">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {(requestStatus === RequestStatusType.loading) && <LinearProgress/>}
        <ErrorSnackbar/>
      </AppBar>
      <Container fixed style={{margin: "0"}}>
        <Grid container style={{margin: "20px 0 20px"}}>
          <Paper style={{padding: "10px"}}>
            <AddTodoListForm disabled={requestStatus === RequestStatusType.loading}/>
          </Paper>
        </Grid>
        <Grid container spacing={3}>
          <TodoListsList/>
        </Grid>
      </Container>
    </div>
  )
}