import React from "react";
import {useSelector} from "react-redux";
import {todoListsSelector} from "../../selectors/todoListsSelector";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./TodoList/TodoList";

export const TodoListsList: React.FC = () => {
    const todoLists = useSelector(todoListsSelector)
    return (
        <>
            {
                todoLists.length
                    ? todoLists.map(todoList =>
                        <Grid item key={todoList.id}>
                            <Paper style={{padding: "10px"}}>
                                <TodoList todoList={todoList}/>
                            </Paper>
                        </Grid>
                    )
                    : <span>Create your 1st todo list</span>
            }
        </>
    )
}