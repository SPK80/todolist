import {useAppSelector} from "../bll/store";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {initializeAppTC, RequestStatusType} from "../bll/appReducer";
import {ErrorSnackbar} from "common/components/ErrorSnackbar";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import {TodoListsList} from "features/todoLists";
import {Login} from "features/login";
import {logoutTC} from "features/login/bll/authReducer";

export const AppContent = () => {
    const requestStatus = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) return <div><CircularProgress/></div>

    const logoutHandler = () => dispatch(logoutTC())
    const loginHandler = () => navigate('/login')

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
                    {isLoggedIn
                        ? <Button onClick={logoutHandler} color="inherit">LogOut</Button>
                        : <Button onClick={loginHandler} color="inherit">LogIn</Button>
                    }

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
