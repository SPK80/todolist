import {v1} from "uuid";
import {TaskStateType} from "../App";
import {AddNewTaskAC, ChangeTaskIsDoneAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    
    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ],
    }
    
    const removingTaskId = "2";
    const endState = tasksReducer(startState, RemoveTaskAC(removingTaskId, todolistId1));
    
    expect(endState).not.toBe(startState)
    
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    
    expect(endState[todolistId1]).toEqual([
        {id: "1", title: "CSS", isDone: false},
        {id: "3", title: "React", isDone: false},
    ])
    expect(endState[todolistId2]).toEqual([
        {id: "1", title: "bread", isDone: false},
        {id: "2", title: "milk", isDone: true},
        {id: "3", title: "tea", isDone: false},
    ])
})

test('correct task should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    
    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
        ],
    }
    
    const newTask = "Redux";
    const newTaskId = "4";
    const endState = tasksReducer(startState, AddNewTaskAC(newTaskId, newTask, todolistId1));
    
    expect(endState).not.toBe(startState)
    
    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(1)
    
    expect(endState[todolistId1]).toEqual([
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: newTaskId, title: newTask, isDone: false},
    ])
    expect(endState[todolistId2]).toEqual([
        {id: "1", title: "bread", isDone: false},
    ])
})

test('correct isDone of task should be changed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    
    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
        ],
    }
    
    const changingTaskId = "1";
    const newIsDone = true;
    
    const endState = tasksReducer(startState, ChangeTaskIsDoneAC(changingTaskId, newIsDone, todolistId1));
    
    expect(endState).not.toBe(startState)
    
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(1)
    
    expect(endState[todolistId1]).toEqual([
        {id: "1", title: "CSS", isDone: true},
        {id: "2", title: "JS", isDone: true},
    ])
    expect(endState[todolistId2]).toEqual([
        {id: "1", title: "bread", isDone: false},
    ])
})

test('correct task should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    
    const startState: TaskStateType = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
        ],
    }
    
    const changingTaskId = "2";
    const newTitle = "React";
    
    const endState = tasksReducer(startState, changeTaskTitleAC(changingTaskId, newTitle, todolistId1));
    
    expect(endState).not.toBe(startState)
    
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(1)
    
    expect(endState[todolistId1]).toEqual([
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: newTitle, isDone: true},
    ])
    expect(endState[todolistId2]).toEqual([
        {id: "1", title: "bread", isDone: false},
    ])
})
