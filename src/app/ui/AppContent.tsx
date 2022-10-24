import {useAppSelector} from "../bll/store";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {initializeAppTC, RequestStatusType} from "../bll/appReducer";
import {ErrorSnackbar} from "common/components/ErrorSnackbar";
import Container from "@mui/material/Container";
import {TodoListsList} from "features/todoLists";
import {Login} from "features/login";

export const AppContent = () => {
  const requestStatus = useAppSelector(state => state.app.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAppTC())
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
          <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
        </Toolbar>
        {(requestStatus === RequestStatusType.loading) && <LinearProgress/>}
        <ErrorSnackbar/>
      </AppBar>
      <Container fixed style={{margin: "0"}}>
        <Routes>
          <Route path='/' element={<TodoListsList/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
          <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>
      </Container>
    </div>
  )
}
