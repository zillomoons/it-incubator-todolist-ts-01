import {MyButton} from "./Button";
import {Input} from "./Input";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addNewItemTitle: (title: string)=> void
}

export const AddItemInput =({addNewItemTitle}:PropsType)=>{
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        e.key === 'Enter' && addNewTitle()
    }
    const addNewTitle = () => {
        const trimmedTitle = newTitle.trim();
        if (trimmedTitle){
            addNewItemTitle(trimmedTitle);
            setNewTitle('')
        } else {
            setError(true)
        }
    }
    return (
        <div className={'inputWithButton'}>
            <Input value={newTitle} onChange={onNewTaskChanged} onKeyPress={onKeyPressHandler} error={error} />
            <MyButton name={'+'} callback={addNewTitle} />
        </div>
    )
}