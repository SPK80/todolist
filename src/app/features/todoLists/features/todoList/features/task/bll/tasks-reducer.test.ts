import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoListAC, TodolistDomainType, removeTodoListAC, todoListsReducer} from "../../../bll/todolist-reducer";
import {TaskPriorities, TaskStatuses, TodoListType} from "../../../../../../../../common/dal/todoListsApi";
import {RequestStatusType} from "../../../../../../../bll/appReducer";

let todolistId1: string;
let todolistId2: string;

let startTasksState: TasksStateType;
let startTodoListsState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = 'todolistId1';
    todolistId2 = 'todolistId2';
    startTasksState = {
        [todolistId1]: [
            {
                id: "1",
                title: "CSS",
                todoListId: todolistId1,
                addedDate: "",
                startDate: "",
                priority: TaskPriorities.Middle,
                deadline: "",
                order: 0,
                description: "",
                status: 0,
                entityStatus: RequestStatusType.idle,
            },
            {
                id: "2",
                title: "JS",
                todoListId: todolistId1,
                addedDate: "",
                startDate: "",
                priority: TaskPriorities.Middle,
                deadline: "",
                order: 0,
                description: "",
                status: TaskStatuses.InProgress,
                entityStatus: RequestStatusType.idle,
            },
        ],
        [todolistId2]: [
            {
                id: "1",
                title: "bread",
                todoListId: todolistId2,
                addedDate: "",
                startDate: "",
                priority: TaskPriorities.Middle,
                deadline: "",
                order: 0,
                description: "",
                status: TaskStatuses.InProgress,
                entityStatus: RequestStatusType.idle,
            },
        ]
    }
    
    startTodoListsState = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            order: 0,
            addedDate: '',
            entityStatus: RequestStatusType.idle
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            order: 0,
            addedDate: '',
            entityStatus: RequestStatusType.idle
        },
    ]
    
})

test('correct task should be removed', () => {
    
    const removingTaskId = "2";
    const endState = tasksReducer(startTasksState, removeTaskAC(removingTaskId, todolistId1));
    
    expect(endState[todolistId1].length).toBe(startTasksState[todolistId1].length - 1)
    expect(endState[todolistId2].length).toBe(startTasksState[todolistId2].length)
    
})

test('status of task should be changed to Completed', () => {
    
    const changingTaskId = startTasksState[todolistId1][0].id
    const newStatus = TaskStatuses.Completed
    
    const action = changeTaskStatusAC(changingTaskId, newStatus, todolistId1)
    const endState: TasksStateType = tasksReducer(startTasksState, action)
    
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed)
})

test('correct task should be added to correct array', () => {
    
    const action = addTaskAC({
        id: '[taskId]',
        title: "juice",
        todoListId: todolistId2,
        addedDate: "",
        startDate: "",
        priority: TaskPriorities.Middle,
        deadline: "",
        order: 0,
        description: "",
        status: TaskStatuses.InProgress,
    })
    const endState: TasksStateType = tasksReducer(startTasksState, action)
    const startStateTodolistId1Length = startTasksState[todolistId1].length
    const startStateTodolistId2Length = startTasksState[todolistId2].length
    
    expect(endState[todolistId1].length).toBe(startStateTodolistId1Length);
    expect(endState[todolistId2].length).toBe(startStateTodolistId2Length + 1);
    expect(endState[todolistId2][0].title).toBe("juice");
    
})

test('task title should be changed correctly ', () => {
    
    const newTitle = "water"
    const action = changeTaskTitleAC("1", newTitle, todolistId2)
    const endState = tasksReducer(startTasksState, action)
    
    expect(endState[todolistId2][0].title).toBe(newTitle)
})

test('new todoList should be added correctly', () => {
    
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []
    const newTodoList: TodoListType = {
        id: 'newTodoListId',
        title: 'new todolist',
        order: 1,
        addedDate: 'addedDate',
    }
    
    const action = addTodoListAC(newTodoList)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    const endTasksState = tasksReducer(startTasksState, action)
    
    expect(endTodoListsState.length).toBe(startTodoListsState.length + 1);
    expect(endTodoListsState[startTodoListsState.length])
        .toEqual<TodolistDomainType>({...newTodoList, filter: "all", entityStatus: RequestStatusType.idle});
    expect(endTasksState[newTodoList.id]).toEqual([]);
    
});

test('todoList should be removed correctly', () => {
    
    const removingTodoListId = "todolistId1"
    const action = removeTodoListAC(removingTodoListId)
    
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    
    expect(endTasksState[removingTodoListId]).toBeUndefined()
    expect(endTodoListsState.length).toBe(1)
});
