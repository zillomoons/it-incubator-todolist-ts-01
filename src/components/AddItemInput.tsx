import {Button} from "./Button";
import {Input} from "./Input";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addNewItemTitle: (title: string)=> void
}

export const AddItemInput =({addNewItemTitle}:PropsType)=>{
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        e.key === 'Enter' && addNewTaskTitle()
    }
    const addNewTaskTitle = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle){
            addNewItemTitle(trimmedTitle);
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    return (
        <div className={'inputWithButton'}>
            <Input value={newTaskTitle} onChange={onNewTaskChanged} onKeyPress={onKeyPressHandler} error={error} />
            <Button name={'+'} callback={addNewTaskTitle} />
        </div>
    )
}