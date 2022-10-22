import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {useAppSelector} from "app/bll/store";
import {TodoList} from "features/todoList";

export const TodoListsList: React.FC = () => {
  const todoLists = useAppSelector(state => state.todoLists)
  if (todoLists.length)
    return (
      <>
        {
          todoLists.map(todoList =>
            <Grid item key={todoList.id}>
              <Paper style={{padding: "10px"}}>
                <TodoList todoList={todoList}/>
              </Paper>
            </Grid>
          )
        }
      </>
    )
  else return <span>Create your 1st todo list</span>
}
