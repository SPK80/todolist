import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {
    addTodoListAC,
    removeTodoListAC,
    todoListsReducer,
    TodoListType
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = {
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
})


test('correct task should be removed', () => {
    const removingTaskId = "2";
    const endState = tasksReducer(startState, removeTaskAC(removingTaskId, todolistId1));

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
    const newTaskTitle = "Redux"
    const newTaskId = "4"
    const action = addTaskAC(newTaskId, newTaskTitle, todolistId1)
    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0]).toEqual(
        {id: newTaskId, title: newTaskTitle, isDone: false}
    )
})

test('correct isDone of task should be changed', () => {

    const changingTaskId = startState[todolistId1][0].id
    const newIsDone = !startState[todolistId1][0].isDone
    const action = changeTaskStatusAC(changingTaskId, newIsDone, todolistId1)
    const endState: TasksStateType = tasksReducer(startState, action)
    expect(endState[todolistId1][0].isDone).toBe(newIsDone)
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC(v1(), "juce", todolistId2)
    const endState: TasksStateType = tasksReducer(startState, action)
    const startStateTodolistId1Length = startState[todolistId1].length
    const startStateTodolistId2Length = startState[todolistId2].length
    expect(endState[todolistId1].length).toBe(startStateTodolistId1Length);
    expect(endState[todolistId2].length).toBe(startStateTodolistId2Length + 1);
    expect(endState[todolistId2][0].title).toBe("juce");
})

test('correct task should change its title', () => {
    const newTitle = "water"
    const action = changeTaskTitleAC("2", newTitle, todolistId2)
    const endState = tasksReducer(startState, action)
    expect(endState[todolistId2][1].title).toBe(newTitle)
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []
    const newTodoListId = v1()
    const action = addTodoListAC(newTodoListId, "new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});


test('delete todo list', () => {
    const startTasksState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }

    const startTodolistsState: Array<TodoListType> = [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ]

    const removingTodoListId = "todolistId1"
    const action = removeTodoListAC(removingTodoListId)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    expect(endTasksState[removingTodoListId]).toBeUndefined()
    expect(endTodolistsState.length).toBe(1)
});
