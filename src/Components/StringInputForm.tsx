import React, {KeyboardEvent, useState, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type StringInputFormPropsType = {
    label: string
    confirm: (value: string) => void
}

export const StringInputForm: React.FC<StringInputFormPropsType> = ({label, confirm}) => {
    
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    
    const onClickButtonHandler = () => {
        if (value.trim() === '') setError(true)
        else confirm(value)
        setValue('')
    }
    
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') onClickButtonHandler()
        if (e.key === 'Escape') setValue('')
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    
    return (
        <div>
            <TextField
                value={value}
                label={label}
                size={"small"}
                variant={"outlined"}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}
                helperText={error && "Input text required"}
                error={error}
            />
            <IconButton
                style={{padding: "8px 0"}}
                color={"primary"}
                onClick={onClickButtonHandler}
            ><AddBox/>
            </IconButton>
        </div>
    )
}