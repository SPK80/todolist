import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./TodoList/TodoList";
import {useAppSelector} from "../../app/store";

export const TodoListsList: React.FC = () => {
    const todoLists = useAppSelector(state => state.todoLists)
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