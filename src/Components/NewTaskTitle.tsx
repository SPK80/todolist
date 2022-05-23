import React, {useRef} from "react";

type NewTaskTitlePropsType = {
    onAddNewTask: (newTaskTitle: string) => void
}

export const NewTaskTitle = (props: NewTaskTitlePropsType) => {
    
    const newTaskTitleInput = useRef<HTMLInputElement>(null)
    
    const onClickButtonHandler = () => {
        if(newTaskTitleInput && newTaskTitleInput.current) {
            props.onAddNewTask(newTaskTitleInput.current.value)
            newTaskTitleInput.current.value=''
        }
    }
    
    return (
        <div>
            <input ref={newTaskTitleInput}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    )
}