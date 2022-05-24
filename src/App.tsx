import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from 'uuid';
import {FilterValuesType} from "./Components/FiltersPanel";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
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


    const initTasks = {
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

    }

    const [allTasks, setAllTasks] = useState(initTasks)


    const changeTaskIsDone = (id: string, value: boolean, todoListId: string) => {

        const tasks = allTasks[todoListId]
        const task = tasks.find(t => t.id === id)
        if (!task) return
        task.isDone = value

        setAllTasks({...allTasks})
    };

    const addNewTask = (newTaskTitle: string, todoListId: string) => {
        if (!newTaskTitle) return;
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
                    const tasks = allTasks[todoList.id]


                    return <Todolist
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasks}
                        removeTask={taskId => removeTask(taskId, todoList.id)}
                        changeTaskIsDone={(id, value) => changeTaskIsDone(id, value, todoList.id)}
                        addNewTask={newTaskTitle => addNewTask(newTaskTitle, todoList.id)}
                        filter={todoList.filter}
                        changeFilter={(filter) => changeFilterHandler(filter, todoList.id)}
                    />
                })
            }

        </div>
    );
}

export default App;
