import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {TodoListContainer} from "./TodoListContainer";
import {StringInputForm} from "./Components/StringInputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAC} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {todoListsSelector} from "./selectors/todoListsSelector";

export const AppWithRedux = () => {

    const todoLists = useSelector(todoListsSelector)
    const dispatch = useDispatch()

    const addNewTodoList = (title: string) =>
        dispatch(addTodoListAC(v1(), title))


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
                        <StringInputForm
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
                                    <TodoListContainer
                                        todoList={todoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                        :
                        <span>Create your 1st todo list</span>
                    }
                </Grid>

            </Container>

        </div>
    )
}