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
    DomainTodoListType
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
let startTasksState: TasksStateType;
let startTodolistsState: Array<DomainTodoListType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startTasksState = {
        [todolistId1]: [
            {
                id: "1",
                title: "CSS",
                completed: false,
                todoListId: todolistId1,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            },
            {
                id: "2",
                title: "JS",
                completed: true,
                todoListId: todolistId1,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            },
            {
                id: "3",
                title: "React",
                completed: false,
                todoListId: todolistId1,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            }
        ],
        [todolistId2]: [
            {
                id: "1",
                title: "bread",
                completed: false,
                todoListId: todolistId2,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            },
            {
                id: "2",
                title: "milk",
                completed: true,
                todoListId: todolistId2,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            },
            {
                id: "3",
                title: "tea",
                completed: false,
                todoListId: todolistId2,
                addedDate: "",
                startDate: "",
                priority: 0,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
            }
        ]
    }
    
    startTodolistsState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ]
    
})

test('correct task should be removed', () => {
    const removingTaskId = "2";
    const endState = tasksReducer(startTasksState, removeTaskAC(removingTaskId, todolistId1));
    
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    
})

test('correct completed of task should be changed', () => {
    
    const changingTaskId = startTasksState[todolistId1][0].id
    const newcompleted = !startTasksState[todolistId1][0].completed
    const action = changeTaskStatusAC(changingTaskId, newcompleted, todolistId1)
    const endState: TasksStateType = tasksReducer(startTasksState, action)
    expect(endState[todolistId1][0].completed).toBe(newcompleted)
})

test('correct task should be added to correct array', () => {
    
    const action = addTaskAC({
        id: v1(),
        title: "juice",
        completed: false,
        todoListId: todolistId2,
        addedDate: "",
        startDate: "",
        priority: 0,
        deadline: "",
        order: 0,
        description: "",
        status: 0,
    })
    const endState: TasksStateType = tasksReducer(startTasksState, action)
    const startStateTodolistId1Length = startTasksState[todolistId1].length
    const startStateTodolistId2Length = startTasksState[todolistId2].length
    expect(endState[todolistId1].length).toBe(startStateTodolistId1Length);
    expect(endState[todolistId2].length).toBe(startStateTodolistId2Length + 1);
    expect(endState[todolistId2][0].title).toBe("juice");
})

test('correct task should change its title', () => {
    const newTitle = "water"
    const action = changeTaskTitleAC("2", newTitle, todolistId2)
    const endState = tasksReducer(startTasksState, action)
    expect(endState[todolistId2][1].title).toBe(newTitle)
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<DomainTodoListType> = []
    const newTodoListId = v1()
    const action = addTodoListAC({id: v1(), title: "new todolist", order: 0, addedDate: ''})
    
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodoListsState[0].id;
    
    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodolists).toBe(action.todoList.id);
});


test('delete todo list', () => {
    
    const removingTodoListId = "todolistId1"
    const action = removeTodoListAC(removingTodoListId)
    
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)
    
    expect(endTasksState[removingTodoListId]).toBeUndefined()
    expect(endTodolistsState.length).toBe(1)
});
