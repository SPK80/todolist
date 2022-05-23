import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from 'uuid';
import {TaskType} from "./Components/Task";
import {FilterValuesType} from "./Components/FiltersPanel";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {
    
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )
    
    const initTasks: Array<TaskType> = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ];
    
    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks)
    
    function removeTask(id: string) {
        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    
    function changeTaskIsDone(id: string, value: boolean) {
        const changedTasks = tasks.map((task): TaskType => {
            if (task.id === id) {
                return {...task, isDone: value};
            }
            return task
        });
        
        setTasks(changedTasks)
    }
    
    function addNewTask(newTaskTitle: string) {
        if (!newTaskTitle) return;
        setTasks([
            {id: v1(), title: newTaskTitle, isDone: false},
            ...tasks
        ])
    }
    
    const changeFilterHandler = (newFilter: FilterValuesType, id: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.filter = newFilter
            setTodoLists([...todoLists])
        }
        
    };
    
    return (
        <div className="App">
            {
                todoLists.map(todoList => {
                    
                    return <Todolist
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasks}
                        removeTask={removeTask}
                        changeTaskIsDone={changeTaskIsDone}
                        addNewTask={addNewTask}
                        filter={todoList.filter}
                        changeFilter={(filter) => changeFilterHandler(filter, todoList.id)}
                    />
                })
            }
        
        </div>
    );
}

export default App;
