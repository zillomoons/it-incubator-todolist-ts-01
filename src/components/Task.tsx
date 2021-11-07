import React from "react"
import {SpanWithEditMode} from "./SpanWithEditMode";
import {Checkbox} from "./Checkbox";
import {DeleteButton} from "./DeleteButton";
import styled from "styled-components";

type PropsType = {
    title: string
    changeStatus: (isDone: boolean) => void
    isDone: boolean
    editTaskTitle: (title: string) => void
    removeTask: () => void
}

export const Task = ({title, changeStatus, editTaskTitle, removeTask, isDone}: PropsType) => {
    const TaskStyle = `${'taskStyle'} ${isDone ? 'is-done' : ''}`
    return (
        <TaskContainer className={TaskStyle}>
            <label>
                <Checkbox isDone={isDone} changeStatus={changeStatus}/>
            </label>
            <SpanWithEditMode title={title} editTitle={editTaskTitle}/>
            <DeleteButton callback={removeTask}/>
        </TaskContainer>
    )
}

const TaskContainer = styled.div`
  display: flex;
  padding: 3px 5px;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin-bottom: 8px;
  
  &:hover{
    background: bisque;
  }
`