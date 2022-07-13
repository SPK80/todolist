export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    todoListId: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT;

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        
        default:
            return state
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})

export const addTodoListAC = (todoListId: string, title: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    title,
    todoListId
})


export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})