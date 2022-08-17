import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm";
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
import {addTodoListTC, fetchTodoListsTC} from "../features/TodoListsList/TodoList/todolist-reducer";
import {useDispatch} from "react-redux";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./appReducer";

export const App = () => {
    console.log('App');
    const requestStatus = useAppSelector(state => state.app.status)
    console.log('requestStatus:', RequestStatusType[requestStatus])
    const dispatch = useDispatch()
    
    //fetch TodoLists
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])
    
    //create TodoList
    const addNewTodoList = useCallback((title: string) =>
            dispatch(addTodoListTC(title))
        , [])
    
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
            </AppBar>
            
            <Container
                fixed
                style={{margin: "0"}}
            >
                <Grid container
                      style={{margin: "20px 0 20px"}}
                >
                    <Paper style={{padding: "10px"}}>
                        <AddItemForm
                            label={"New Todo List"}
                            confirm={addNewTodoList}
                        />
                    </Paper>
                </Grid>
                
                <Grid container spacing={3}>
                    <TodoListsList/>
                </Grid>
            
            </Container>
        
        </div>
    )
}