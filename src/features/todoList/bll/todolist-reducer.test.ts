import {v1} from "uuid";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC, FilterValuesType,
  removeTodoListAC,
  todoListsReducer, TodolistDomainType
} from "./todolist-reducer";
import {RequestStatusType} from "app/bll/appReducer";

let todolistId1: string;
let todolistId2: string;

let startTodoListsState: Array<TodolistDomainType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  
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

test('correct todolist should be removed', () => {
  const endState = todoListsReducer(startTodoListsState, removeTodoListAC(todolistId2))
  
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
})

test('correct todolist should be added', () => {
  let newTodolistTitle = "New Todolist";
  const endState = todoListsReducer(startTodoListsState, addTodoListAC({
    id: v1(),
    title: newTodolistTitle,
    order: 0,
    addedDate: ''
  }))
  
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = "completed";
  const endState = todoListsReducer(startTodoListsState, changeTodoListFilterAC(todolistId2, newFilter));
  
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = "New Todolist";
  const endState = todoListsReducer(startTodoListsState, changeTodoListTitleAC(todolistId2, newTodolistTitle));
  
  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
})
