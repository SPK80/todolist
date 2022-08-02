export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const removeTodoListAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    id
}) as const

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
}) as const

type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>

export const addTodoListAC = (id: string, title: string) => ({
    type: "ADD-TODOLIST",
    title,
    id
}) as const

export type AddTodoListAT = ReturnType<typeof addTodoListAC>


export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
}) as const

type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.id,
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