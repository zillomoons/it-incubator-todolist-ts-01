import React, {useCallback} from "react"
import {SpanWithEditMode} from "../../../components/spanWithEditMode/SpanWithEditMode";
import {Checkbox} from "../../../components/Checkbox";
import {DeleteButton} from "../../../components/DeleteButton";
import styled from "styled-components";
import {deleteTask, TaskEntityType, updateTask} from "../../../state/tasks-reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../../api/todolists-api";

type PropsType = {
    todoID: string
    task: TaskEntityType
}

export const Task = React.memo(({task, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const disabled = task.entityStatus === 'loading';
    const editTaskTitle = useCallback((title: string) => {
        dispatch(updateTask({todoID: todoID, taskID: task.id, model: {title} }));
    }, [dispatch, todoID, task.id])
    const changeStatus = useCallback((status: TaskStatuses) => {
        dispatch(updateTask({todoID: todoID, taskID: task.id, model: {status} }));
    }, [dispatch, todoID, task.id])
    const removeTask = useCallback(() => {
        task.id && dispatch(deleteTask({todoID, taskID: task.id }));
    }, [dispatch, todoID, task.id])

    const TaskStyle = `${'taskStyle'} ${task.status ? TaskStatuses.Completed : ''}`
    return (
        <TaskContainer className={TaskStyle}>
            <label>
                <Checkbox status={task.status} changeStatus={changeStatus}/>
            </label>
            <SpanWithEditMode disabled={disabled} title={task.title} editTitle={editTaskTitle}/>
            <DeleteButton disabled={disabled} callback={removeTask}/>
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
