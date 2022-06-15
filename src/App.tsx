import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {FilterValuesType} from "./Components/FiltersPanel";
import {TaskType} from "./Components/Task";
import {TodoListContainer, TodoListType} from "./TodoListContainer";
import {StringInputForm} from "./Components/StringInputForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// reducer -> useReducer -> Redux

export type TaskStateType = {
    [id: string]: Array<TaskType>
}


export const App = () => {
    
    const todoList1Id = v1();
    const todoList2Id = v1();
    
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
            {id: todoList1Id, title: 'What to learn', filter: 'all'},
            {id: todoList2Id, title: 'What to buy', filter: 'all'},
        ]
    )
    
    const [allTasks, setAllTasks] = useState<TaskStateType>({
        [todoList1Id]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoList2Id]: [
            {id: v1(), title: "Apples", isDone: true},
            {id: v1(), title: "Cheese", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ],
    })
    
    const changeTaskIsDone = (taskId: string, value: boolean, todoListId: string) => {
        const tasks = allTasks[todoListId]
        const updatedTasks = tasks.map(t => t.id === taskId ? {...t, isDone: value} : t)
        setAllTasks({...allTasks, [todoListId]: updatedTasks})
    }
    
    const changeFilter = (newFilter: FilterValuesType, todoListId: string) => {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilter} : tl)
        setTodoLists([...updatedTodoLists])
    }
    
    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        allTasks[todoListId] = [
            {id: v1(), title: newTaskTitle, isDone: false},
            ...allTasks[todoListId]
        ]
        setAllTasks({...allTasks})
    }
    
    const removeTask = (id: string, todoListId: string) => {
        allTasks[todoListId] = allTasks[todoListId].filter(task => task.id !== id)
        setAllTasks({...allTasks})
    }
    
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete allTasks[todoListId]
    }
    
    const addNewTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setAllTasks({...allTasks, [newTodoListId]: []})
    }
    
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        
        const changedTasks = allTasks[todoListId].map((task): TaskType =>
            (task.id !== taskId) ? task : {...task, title: newTitle}
        )
        setAllTasks({...allTasks, [todoListId]: changedTasks})
    }
    
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        const changedTodoLists = todoLists.map((todoList): TodoListType =>
            (todoList.id !== todoListId) ? todoList : {...todoList, title: newTitle}
        )
        setTodoLists(changedTodoLists)
    }
    
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