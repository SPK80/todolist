import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAC, setTodoListsAC} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {todoListsSelector} from "./selectors/todoListsSelector";
import {TodoList} from "./Components/TodoList";
import {todoListsApi} from "./api/todoListsApi";
import {setTasksAC} from "./reducers/tasks-reducer";

export const App = () => {
    console.log('App')
    
    const todoLists = useSelector(todoListsSelector)
    const dispatch = useDispatch()
    
    //get TodoLists and Tasks
    useEffect(() => {
        todoListsApi.getTodoLists()
            .then(todoLists => {
                if (!todoLists) return
                dispatch(setTodoListsAC(todoLists))
                todoLists.forEach(tl => todoListsApi.getTasks(tl.id)
                    .then(res => {
                        dispatch(setTasksAC(res.items, tl.id))
                    })
                    .catch(res => console.log(res))
                )
                
            })
    }, [])
    
    //create TodoList
    const addNewTodoList = useCallback((title: string) =>
            todoListsApi.createTodoList(title).then(data => {
                dispatch(addTodoListAC(data.item))
            })
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
                    {todoLists.length
                        ? todoLists.map(todoList =>
                            <Grid item key={todoList.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList todoList={todoList}/>
                                </Paper>
                            </Grid>
                        )
                        : <span>Create your 1st todo list</span>
                    }
                </Grid>
            
            </Container>
        
        </div>
    )
}