import React, {useCallback} from "react"
import {SpanWithEditMode} from "../spanWithEditMode/SpanWithEditMode";
import {Checkbox} from "../Checkbox";
import {DeleteButton} from "../DeleteButton";
import styled from "styled-components";
import {ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC} from "../../state/tasksReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    todoID: string
    taskID: string
    title: string
    isDone: boolean
}

export const Task = React.memo(({title, taskID, isDone, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const editTaskTitle = useCallback((title: string) => {
        dispatch(EditTaskTitleAC(todoID, taskID, title));
    }, [dispatch, todoID, taskID])
    const changeStatus = useCallback((isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoID, taskID, isDone));
    }, [dispatch, todoID, taskID])
    const removeTask = useCallback(() => {
        dispatch(RemoveTaskAC(todoID, taskID));
    }, [dispatch, todoID, taskID])

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
} );

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