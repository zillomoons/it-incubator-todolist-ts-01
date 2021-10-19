import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    editTitle: (title: string)=> void
}

export const SpanWithEditMode = ({title, editTitle}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setValue(title);
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        editTitle(value)
    }
    return editMode
        ? <input value={value} onChange={onInputChange} onBlur={deactivateEditMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}