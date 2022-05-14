import React, {ChangeEvent, useState} from "react";

type NewTaskTitlePropsType = {
    onAddNewTask: (newTaskTitle:string) => void
}

export const NewTaskTitle = (props: NewTaskTitlePropsType) => {
    
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    
    const onChangeInputHandler= (event: ChangeEvent<HTMLInputElement>)=> {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onClickButtonHandler=()=>{
        props.onAddNewTask(newTaskTitle)
        setNewTaskTitle('')
    }
    
    return (
        <div>
            <input value={newTaskTitle} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    )
}