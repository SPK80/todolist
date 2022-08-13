import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm";
import {Task} from "./Task/Task";
import {FiltersPanel} from "../../../components/FiltersPanel";
import {EditableSpan} from "../../../components/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTaskStatusTC,
    changeTaskTitleTC,
    createTaskTC,
    fetchTasksTC,
    removeTaskTC,
} from "./Task/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    DomainTodoListType,
    FilterValuesType,
    removeTodoListAC
} from "./todolist-reducer";
import {tasksSelector} from "../../../selectors/tasksSelector";
import {TaskStatuses, todoListsApi} from "../../../api/todoListsApi";

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
    
    if (todoList.filter === 'completed') tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed);
    if (todoList.filter === 'active') tasksForTodoList = tasksForTodoList.filter(task => task.status !== TaskStatuses.Completed);
    
    const toggleFilterHandler = useCallback((newFilter: FilterValuesType) =>
            dispatch(changeTodoListFilterAC(todoList.id, newFilter))
        , [])
    
    const addNewTaskHandler = useCallback((newTaskTitle: string) =>
            dispatch(createTaskTC(newTaskTitle, todoList.id))
        , [])
    
    const removeTaskHandler = useCallback((taskId: string) =>
            dispatch(removeTaskTC(taskId, todoList.id))
        , [])
    
    const changeTaskStatusHandler = useCallback((taskId: string, value: TaskStatuses) =>
            dispatch(changeTaskStatusTC(taskId, value, todoList.id))
        , [])
    
    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(taskId, todoList.id, newTitle))
    }, [])
    
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
                                changeTaskStatus={changeTaskStatusHandler}
                                changeTaskTitle={changeTaskTitleHandler}
                            />
                        )}
                    </>
                    : <div>Create your task</div>
            }
        </div>
    )
})