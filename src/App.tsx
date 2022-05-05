import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active';

export const App = () => {
    console.log('App rerender');

    const initTasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ];

    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks)

    function removeTask(id: number) {

        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function changeTaskIsDone(id: number, value: boolean) {
        const changedTasks = tasks.map((task): TaskType => {
            if (task.id === id) {
                return {...task, isDone: value};
            }
            return task
        });

        setTasks(changedTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                removeTask={removeTask}
                changeTaskIsDone={changeTaskIsDone}/>
        </div>
    );
}

export default App;
