import React, {useRef, KeyboardEvent, useState} from "react";
import s from './TitleInput.module.css'

type StringInputFormPropsType = {
    confirm: (value: string) => void
}

export const StringInputForm: React.FC<StringInputFormPropsType> = ({confirm}) => {
    
    const inputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    
    const onClickButtonHandler = () => {
        if (inputRef?.current) {
            if (inputRef.current.value.trim() === '') setError(true)
            confirm(inputRef.current.value)
            inputRef.current.value = ''
        }
    }
    
    const onInputKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') onClickButtonHandler()
        if (e.key === 'Escape' && inputRef?.current) inputRef.current.value = ''
    }
    
    return (
        <div>
            <input
                ref={inputRef}
                onKeyDown={onInputKeyPressHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div className={s.error}>Input text required</div>}
        </div>
    )
}