import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    label: string
    confirm: (value: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> =
    memo(({label, confirm, disabled}) => {
        // console.log('AddItemForm', label)
        
        const [value, setValue] = useState('')
        const [error, setError] = useState(false)
        
        const onClickConfirmHandler = () => {
            if (value.trim() === '') setError(true)
            else confirm(value)
            setValue('')
        }
        
        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error) setError(false)
            if (e.key === 'Enter') onClickConfirmHandler()
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
                    onClick={onClickConfirmHandler}
                    disabled={disabled}
                >
                    <AddBox/>
                </IconButton>
            </div>
        )
    })