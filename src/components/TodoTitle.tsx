import {SpanWithEditMode} from "./SpanWithEditMode";
import {MyButton} from "./Button";
import React from "react";

type PropsType = {
    title: string
    editTodoTitle: (title: string) => void
    removeTodoList: () => void
}

export const TodoTitle = ({title, editTodoTitle, removeTodoList}: PropsType) => {
    return <h3>
        <SpanWithEditMode title={title} editTitle={editTodoTitle}/>
        <MyButton name={'x'} callback={removeTodoList}/>
    </h3>
}