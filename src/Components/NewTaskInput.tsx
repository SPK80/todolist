import React, {useRef, KeyboardEvent, useState} from "react";

type NewTaskTitlePropsType = {
    addNewTask: (newTaskTitle: string) => void
}

export const NewTaskInput: React.FC<NewTaskTitlePropsType> = ({addNewTask}) => {

    const newTaskTitleInput = useRef<HTMLInputElement>(null)

    const [error, setError] = useState(false)

    const onClickButtonHandler = () => {
        if (newTaskTitleInput && newTaskTitleInput.current) {
            if (newTaskTitleInput.current.value.trim() === '') setError(true)
            addNewTask(newTaskTitleInput.current.value)
            newTaskTitleInput.current.value = ''
        }
    }

    const onInputKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') onClickButtonHandler()
    }

    return (
        <div>
            <input
                ref={newTaskTitleInput}
                onKeyPress={onInputKeyPressHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div>Input text required</div>}
        </div>
    )
}

export default NewTaskInput;