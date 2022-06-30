export {}
// import {v1} from "uuid";
// import {TasksStateType} from "../App";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
// import {TodoListType} from "../TodoListContainer";
// import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolist-reducer";
//
//
// let todolistId1: string;
// let todolistId2: string;
//
// let startState: TasksStateType;
//
// beforeEach(() => {
//     todolistId1 = v1();
//     todolistId2 = v1();
//     startState = {
//         [todolistId1]: [
//             {id: "1", title: "CSS", isDone: false},
//             {id: "2", title: "JS", isDone: true},
//             {id: "3", title: "React", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: "1", title: "bread", isDone: false},
//             {id: "2", title: "milk", isDone: true},
//             {id: "3", title: "tea", isDone: false},
//         ],
//     }
// })
//
//
// test('correct task should be removed', () => {
//
//     const removingTaskId = "2";
//     const endState = tasksReducer(startState, removeTaskAC(removingTaskId, todolistId1));
//
//     expect(endState).not.toBe(startState)
//
//     expect(endState[todolistId1].length).toBe(2)
//     expect(endState[todolistId2].length).toBe(3)
//
//     expect(endState[todolistId1]).toEqual([
//         {id: "1", title: "CSS", isDone: false},
//         {id: "3", title: "React", isDone: false},
//     ])
//     expect(endState[todolistId2]).toEqual([
//         {id: "1", title: "bread", isDone: false},
//         {id: "2", title: "milk", isDone: true},
//         {id: "3", title: "tea", isDone: false},
//     ])
// })
//
// test('correct task should be added', () => {
//
//     const newTask = "Redux";
//     const newTaskId = "4";
//     const endState = tasksReducer(startState, addTaskAC(newTaskId, newTask, todolistId1));
//
//     expect(endState).not.toBe(startState)
//
//     expect(endState[todolistId1].length).toBe(3)
//     expect(endState[todolistId2].length).toBe(1)
//
//     expect(endState[todolistId1]).toEqual([
//         {id: "1", title: "CSS", isDone: false},
//         {id: "2", title: "JS", isDone: true},
//         {id: newTaskId, title: newTask, isDone: false},
//     ])
//     expect(endState[todolistId2]).toEqual([
//         {id: "1", title: "bread", isDone: false},
//     ])
// })
//
// test('correct isDone of task should be changed', () => {
//
//     const changingTaskId = "1";
//     const newIsDone = true;
//
//     const endState = tasksReducer(startState, changeTaskStatusAC(changingTaskId, newIsDone, todolistId1));
//
//     expect(endState).not.toBe(startState)
//
//     expect(endState[todolistId1].length).toBe(2)
//     expect(endState[todolistId2].length).toBe(1)
//
//     expect(endState[todolistId1]).toEqual([
//         {id: "1", title: "CSS", isDone: true},
//         {id: "2", title: "JS", isDone: true},
//     ])
//     expect(endState[todolistId2]).toEqual([
//         {id: "1", title: "bread", isDone: false},
//     ])
// })
//
// test('correct task should be added to correct array', () => {
//
//     const action = addTaskAC(v1(), "juce", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juce");
//     expect(endState["todolistId2"][0].isDone).toBe(false);
// })
//
// test('status of specified task should be changed', () => {
//
//     const action = changeTaskStatusAC("2", false, "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].isDone).toBe(false);
//     expect(endState["todolistId1"][1].isDone).toBe(true);
// })
//
//
// test('correct task should change its title', () => {
//
//
//     const action = changeTaskTitleAC("2", "water", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe("water");
//     expect(endState["todolistId1"][1].title).toBe("JS");
//     //
//     // const changingTaskId = "2";
//     // const newTitle = "React";
//     //
//     // const endState = tasksReducer(startState, changeTaskTitleAC(changingTaskId, newTitle, todolistId1));
//     //
//     // expect(endState).not.toBe(startState)
//     //
//     // expect(endState[todolistId1].length).toBe(2)
//     // expect(endState[todolistId2].length).toBe(1)
//     //
//     // expect(endState[todolistId1]).toEqual([
//     //     {id: "1", title: "CSS", isDone: false},
//     //     {id: "2", title: newTitle, isDone: true},
//     // ])
//     // expect(endState[todolistId2]).toEqual([
//     //     {id: "1", title: "bread", isDone: false},
//     // ])
// })
//
// test('correct task should change its title', () => {
//
//     const action = changeTaskTitleAC("2", "water", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe("water");
//     expect(endState["todolistId1"][1].title).toBe("JS");
//     //
//     // const changingTaskId = "2";
//     // const newTitle = "React";
//     //
//     // const endState = tasksReducer(startState, changeTaskTitleAC(changingTaskId, newTitle, todolistId1));
//     //
//     // expect(endState).not.toBe(startState)
//     //
//     // expect(endState[todolistId1].length).toBe(2)
//     // expect(endState[todolistId2].length).toBe(1)
//     //
//     // expect(endState[todolistId1]).toEqual([
//     //     {id: "1", title: "CSS", isDone: false},
//     //     {id: "2", title: newTitle, isDone: true},
//     // ])
//     // expect(endState[todolistId2]).toEqual([
//     //     {id: "1", title: "bread", isDone: false},
//     // ])
// })
//
//
// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodoListType> = [];
//     const newTodoListId = v1()
//     const action = addTodoListAC(newTodoListId, "new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todoListsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.todolistId);
//     expect(idFromTodolists).toBe(action.todolistId);
// });
//
//
// test('delete todo list', () => {
//     const startTasksState: TasksStateType = {
//         "todolistId1": [
//             {id: "1", title: "CSS", isDone: false},
//             {id: "2", title: "JS", isDone: true},
//             {id: "3", title: "React", isDone: false}
//         ],
//         "todolistId2": [
//             {id: "1", title: "bread", isDone: false},
//             {id: "2", title: "milk", isDone: true},
//             {id: "3", title: "tea", isDone: false}
//         ]
//     }
//
//     const startTodolistsState: Array<TodoListType> = [
//         {id: "todolistId1", title: "What to learn", filter: "all"},
//         {id: "todolistId2", title: "What to buy", filter: "all"}
//     ]
//
//     const removingTodoListId = "todolistId1"
//     const action = removeTodoListAC(removingTodoListId);
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todoListsReducer(startTodolistsState, action)
//
//     expect(endTasksState[removingTodoListId]).toBeUndefined();
//     expect(endTodolistsState.length).toBe(1);
// });
