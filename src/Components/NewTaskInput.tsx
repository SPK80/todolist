import React, {useRef} from "react";

type NewTaskTitlePropsType = {
    addNewTask: (newTaskTitle: string) => void
}

export const NewTaskInput:React.FC<NewTaskTitlePropsType> = ({addNewTask}) => {
    
    const newTaskTitleInput = useRef<HTMLInputElement>(null)
    
    const onClickButtonHandler = () => {
        if(newTaskTitleInput && newTaskTitleInput.current) {
            addNewTask(newTaskTitleInput.current.value)
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

export default NewTaskInput;