import React, {useRef} from "react";

type NewTaskTitlePropsType = {
    onAddNewTask: (newTaskTitle: string) => void
}

export const NewTaskInput:React.FC<NewTaskTitlePropsType> = ({onAddNewTask}) => {
    
    const newTaskTitleInput = useRef<HTMLInputElement>(null)
    
    const onClickButtonHandler = () => {
        if(newTaskTitleInput && newTaskTitleInput.current) {
            onAddNewTask(newTaskTitleInput.current.value)
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