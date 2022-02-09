import {SpanWithEditMode} from "../spanWithEditMode/SpanWithEditMode";
import React, {useCallback} from "react";
import {DeleteButton} from "../DeleteButton";
import styled from "styled-components";
import {useActions} from "../../store/store";
import {todolistsActions} from "../../state/todoLists-reducer";

type PropsType = {
    title: string
    disabled: boolean
    todoID: string
}

export const TodoTitle = React.memo(({title, todoID, disabled}: PropsType) => {
    const {deleteTodolist, updateTodoTitle} = useActions(todolistsActions);
    const editTodolistTitle = useCallback((title: string) => {
        updateTodoTitle({todoID, title})
    }, [todoID]);
    const removeTodolist = useCallback(()=>deleteTodolist(todoID), [todoID]);
    return <TodoTitleStyled>
        <SpanWithEditMode title={title} disabled={disabled} editTitle={editTodolistTitle}/>
        <DeleteButton disabled={disabled} callback={removeTodolist}/>
    </TodoTitleStyled>
})

const TodoTitleStyled = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
`
