import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

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
    
    const error = value.trim().length < 1
    
    return <span style={{display: "inline-flex", alignContent: "center"}}>
        {isEditing ?
            <TextField
                size={"small"}
                variant={"standard"}
                InputProps={{style: {font: "inherit"}}}
                value={value}
                autoFocus
                helperText={error && "Input text required"}
                error={error}
                onChange={onChangeHandler}
                onBlur={confirm}
                onKeyDown={onKeyDownHandler}
            />
            :
            <span
                style={{font: "inherit", wordWrap: "break-word", whiteSpace: "break-spaces"}}
                onDoubleClick={setInputMode}
            >{props.value}</span>
        }
    </span>
}