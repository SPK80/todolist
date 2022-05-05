import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active';

const App = () => {
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
	
	function getNewId(): number {
		return tasks[tasks.length - 1].id + 1;
	}
	
	function addNewTask(newTaskTitle: string) {
		const newTasks: Array<TaskType> = [
			...tasks,
			{id: getNewId(), title: newTaskTitle, isDone: false}
		]
		setTasks(newTasks)
	}
	
	return (
		<div className="App">
			<Todolist
				title={'What to learn'}
				tasks={tasks}
				removeTask={removeTask}
				addNewTask={addNewTask}
			/>
		</div>
	);
}

export default App;
