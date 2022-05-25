import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from 'uuid';
import {FilterValuesType} from "./Components/FiltersPanel";
import {TaskType} from "./Components/Task";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [id: string]: Array<TaskType>
}

export const App = () => {
    
    const todoList1Id = v1();
    const todoList2Id = v1();
    
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
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
    };
    
    const changeFilterHandler = (newFilter: FilterValuesType, todoListId: string) => {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilter} : tl)
        setTodoLists([...updatedTodoLists])
    }
    
    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        if (!newTaskTitle.trim()) return;
        allTasks[todoListId] = [
            {id: v1(), title: newTaskTitle, isDone: false},
            ...allTasks[todoListId]
        ]
        setAllTasks({...allTasks})
    };
    
    const removeTask = (id: string, todoListId: string) => {
        allTasks[todoListId] = allTasks[todoListId].filter(task => task.id !== id)
        setAllTasks({...allTasks})
    };
    
    function onRemoveTodoListHandler(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete allTasks[todoListId]
    }
    
    return (
        <div className="App">
            {todoLists.length
                ? todoLists.map(todoList => {
                    
                    let tasksForTodoList = allTasks[todoList.id]
                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(task => task.isDone);
                    }
                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone);
                    }
                    
                    return (
                        <Todolist
                            key={todoList.id}
                            todoListId={todoList.id}
                            title={todoList.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeTaskIsDone={changeTaskIsDone}
                            addNewTask={addNewTask}
                            filter={todoList.filter}
                            changeFilter={changeFilterHandler}
                            onRemoveTodoList={onRemoveTodoListHandler}
                        />)
                })
                : <span>Create your 1st todo list</span>
            }
        </div>
    );
}