import React, {useCallback} from "react"
import {SpanWithEditMode} from "../spanWithEditMode/SpanWithEditMode";
import {Checkbox} from "../Checkbox";
import {DeleteButton} from "../DeleteButton";
import styled from "styled-components";
import {ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC, TaskType} from "../../state/tasksReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    todoID: string
    task: TaskType
}

export const Task = React.memo(({task, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const editTaskTitle = useCallback((title: string) => {
        dispatch(EditTaskTitleAC(todoID, task.id, title));
    }, [dispatch, todoID, task.id])
    const changeStatus = useCallback((isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoID, task.id, isDone));
    }, [dispatch, todoID, task.id])
    const removeTask = useCallback(() => {
        dispatch(RemoveTaskAC(todoID, task.id));
    }, [dispatch, todoID, task.id])

    const TaskStyle = `${'taskStyle'} ${task.isDone ? 'is-done' : ''}`
    return (
        <TaskContainer className={TaskStyle}>
            <label>
                <Checkbox isDone={task.isDone} changeStatus={changeStatus}/>
            </label>
            <SpanWithEditMode title={task.title} editTitle={editTaskTitle}/>
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