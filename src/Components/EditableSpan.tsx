import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    confirm: (newValue: string) => void
    escape?: () => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isEditing, setIsEditing] = useState(false)
    
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }
    
    const setSpanMode = () => setIsEditing(false)
    const setInputMode = () => setIsEditing(true)
    
    const escape = () => {
        setSpanMode()
        setValue(props.value)
        if (props.escape) props.escape()
    }
    
    const confirm = () => {
        setSpanMode()
        props.confirm(value)
    }
    
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') confirm()
        if (e.key === 'Escape') escape()
    }
    
    const inputSize = value.toString().length
    
    return <>
        {isEditing ?
            <input
                style={{border: "none", font: "inherit"}}
                type="text"
                value={value}
                autoFocus
                size={inputSize}
                onChange={onChangeHandler}
                onBlur={confirm}
                onKeyDown={onKeyDownHandler}
            />
            :
            <span
                style={{font: "inherit"}}
                onDoubleClick={setInputMode}
            >{props.value}</span>
        }
    </>
}