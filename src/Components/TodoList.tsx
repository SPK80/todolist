import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {FiltersPanel} from "./FiltersPanel";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskTC,
    fetchTasksTC,
    removeTaskTC
} from "../reducers/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    DomainTodoListType,
    FilterValuesType,
    removeTodoListAC
} from "../reducers/todolist-reducer";
import {tasksSelector} from "../selectors/tasksSelector";
import {todoListsApi} from "../api/todoListsApi";

type TodolistPropsType = {
    todoList: DomainTodoListType
}

export const TodoList: React.FC<TodolistPropsType> = memo(({todoList}) => {

    console.log('Todolist', todoList.title)

    let tasksForTodoList = useSelector(tasksSelector(todoList.id))
    const dispatch = useDispatch()

    //fetch Tasks of this TodoList
    useEffect(() => {
        dispatch(fetchTasksTC(todoList.id))
    }, [])

    if (todoList.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(task => task.completed);
    if (todoList.filter === 'active') tasksForTodoList = tasksForTodoList.filter(task => !task.completed);

    const toggleFilterHandler = useCallback((newFilter: FilterValuesType) =>
            dispatch(changeTodoListFilterAC(todoList.id, newFilter))
        , [])

    const addNewTaskHandler = useCallback((newTaskTitle: string) =>
            dispatch(createTaskTC(newTaskTitle, todoList.id))
        , [])

    const removeTaskHandler = useCallback((taskId: string) =>
            dispatch(removeTaskTC(taskId, todoList.id))
        , [])

    const changeTaskIsDoneHandler = useCallback((taskId: string, value: boolean) =>
            dispatch(changeTaskStatusAC(taskId, value, todoList.id))
        , [])

    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) =>
            dispatch(changeTaskTitleAC(taskId, newTitle, todoList.id))
        , [])

    const changeTodoListTitle = (newTitle: string) => {
        todoListsApi.updateTodoListTitle(todoList.id, newTitle)
            .then(res => dispatch(changeTodoListTitleAC(todoList.id, newTitle)))
            .catch(reason => console.log(reason))
    }

    const removeTodoList = () => {
        todoListsApi.deleteTodoList(todoList.id).then(res =>
            dispatch(removeTodoListAC(todoList.id)))
            .catch(reason => console.log(reason))
    }

    return (
        <div>
            <h3 style={{margin: "5px 0"}}>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    onClick={removeTodoList}
                >
                    <Delete/>
                </IconButton>

                <EditableSpan
                    value={todoList.title}
                    confirm={changeTodoListTitle}
                />
            </h3>
            <AddItemForm
                label={"Title"}
                confirm={addNewTaskHandler}
            />

            <FiltersPanel
                filterValue={todoList.filter}
                toggleFilter={toggleFilterHandler}
            />

            {
                tasksForTodoList.length
                    ? <>
                        {tasksForTodoList.map(task =>
                            <Task
                                key={task.id}
                                task={task}
                                removeTask={removeTaskHandler}
                                changeTaskIsDone={changeTaskIsDoneHandler}
                                changeTaskTitle={changeTaskTitleHandler}
                            />
                        )}
                    </>
                    : <div>Create your task</div>
            }
        </div>
    )
})