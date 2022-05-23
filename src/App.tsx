import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from 'uuid';
import {TaskType} from "./Components/Task";

export const App = () => {
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

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
                changeTaskIsDone={changeTaskIsDone}
                addNewTask={addNewTask}
            />
        </div>
    );
}

export default App;
