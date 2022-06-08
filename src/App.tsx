import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {FilterValuesType} from "./Components/FiltersPanel";
import {TaskType} from "./Components/Task";
import {TodoListContainer, TodoListType} from "./TodoListContainer";
import {StringInputForm} from "./Components/StringInputForm";

export const App = () => {
    
    const todoList1Id = v1();
    const todoList2Id = v1();
    
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoList1Id, title: 'What to learn', filter: 'all'},
            {id: todoList2Id, title: 'What to buy', filter: 'all'},
        ]
    )
    
    type TaskStateType = {
        [id: string]: Array<TaskType>
    }
    
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
    
    return (
        <div className="App">
            <StringInputForm
                confirm={addNewTodoList}
            />
            
            {todoLists.length
                ? todoLists.map(todoList =>
                    <TodoListContainer
                        key={todoList.id}
                        todoList={todoList}
                        tasks={allTasks[todoList.id]}
                        removeTask={removeTask}
                        changeTaskIsDone={changeTaskIsDone}
                        addNewTask={addNewTask}
                        changeFilter={changeFilter}
                        onRemoveTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                    />)
                :
                <span>Create your 1st todo list</span>
            }
        </div>
    )
}