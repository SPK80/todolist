import React, {ChangeEvent} from "react";

type NewTaskTitlePropsType = {
    newTaskTitle: string
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
    onClickButton: () => void
}

export const NewTaskTitle = (props: NewTaskTitlePropsType) => (
    <div>
        <input value={props.newTaskTitle} onChange={props.onChangeInput}/>
        <button onClick={props.onClickButton}>+</button>
    </div>
)