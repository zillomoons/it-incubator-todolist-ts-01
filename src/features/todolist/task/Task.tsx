import React, {useCallback} from "react"
import {SpanWithEditMode} from "../../../components/spanWithEditMode/SpanWithEditMode";
import {Checkbox} from "../../../components/Checkbox";
import {DeleteButton} from "../../../components/DeleteButton";
import styled from "styled-components";
import {TaskEntityType} from "../../../state/tasks-reducer/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {tasksActions} from "../../../state/tasks-reducer";
import {useActions} from "../../../store/redux-utils";

type PropsType = {
    todoID: string
    task: TaskEntityType
}

export const Task = React.memo(({task, todoID}: PropsType) => {
    const disabled = task.entityStatus === 'loading';
    const {updateTask, deleteTask} = useActions(tasksActions);// returns thunkCreators wrapped in callback

    const editTaskTitle = useCallback((title: string) => {
        updateTask({todoID: todoID, taskID: task.id, model: {title}});
    }, [todoID, task.id]);
    const changeStatus = useCallback((status: TaskStatuses) => {
        updateTask({todoID: todoID, taskID: task.id, model: {status}});
    }, [todoID, task.id]);
    const removeTask = useCallback(() => {
        task.id && deleteTask({todoID, taskID: task.id});
    }, [todoID, task.id]);

    const taskStyle = task.status ? {opacity: '0.7'} : {};
    return (
        <TaskContainer style={taskStyle}>
            <label>
                <Checkbox status={task.status} changeStatus={changeStatus}/>
            </label>
            <SpanWithEditMode disabled={disabled} title={task.title} editTitle={editTaskTitle}/>
            <DeleteButton disabled={disabled} callback={removeTask}/>
        </TaskContainer>
    )
});

const TaskContainer = styled.div`
  display: flex;
  padding: 3px 10px;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin: 0 15px 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(211, 211, 211, 0.44);
  }
`
