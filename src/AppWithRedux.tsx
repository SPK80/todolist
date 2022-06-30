import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {FilterValuesType} from "./Components/FiltersPanel";
import {TodoListContainer, TodoListType} from "./TodoListContainer";
import {StringInputForm} from "./Components/StringInputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TasksStateType} from "./App";

export const AppWithRedux = () => {
    
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const allTasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    
    const dispatch = useDispatch()
    
    const changeTaskIsDone = (taskId: string, value: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, value, todoListId))
    }
    
    const changeFilter = (newFilter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, newFilter))
    }
    
    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(newTaskTitle, todoListId))
    }
    
    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }
    
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }
    
    const addNewTodoList = (title: string) => {
        dispatch(addTodoListAC(v1(), title))
    }
    
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }
    
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }
    
    console.log('todolists^', todoLists)
    console.log('allTasks^', allTasks)
    
    
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
                                        tasks={allTasks[todoList.id]}
                                        removeTask={removeTask}
                                        changeTaskIsDone={changeTaskIsDone}
                                        addNewTask={addNewTask}
                                        changeFilter={changeFilter}
                                        onRemoveTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
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