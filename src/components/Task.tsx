import React from "react"
import {SpanWithEditMode} from "./SpanWithEditMode";
import {MyButton} from "./Button";

type PropsType = {
    title: string
    changeStatus: (isDone: boolean) => void
    isDone: boolean
    editTaskTitle: (title: string) => void
    removeTask: () => void
}

export const Task = ({title, changeStatus, editTaskTitle, removeTask, isDone}:PropsType) => {
    return (
        <div>
            <input type="checkbox"
                   onChange={(e) => changeStatus(e.currentTarget.checked)}
                   checked={isDone}/>
            <SpanWithEditMode title={title} editTitle={editTaskTitle}/>
            <MyButton name={'x'} callback={removeTask}/>
        </div>
    )
}