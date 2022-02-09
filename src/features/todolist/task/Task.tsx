import React, {useCallback} from "react"
import {SpanWithEditMode} from "../../../components/spanWithEditMode/SpanWithEditMode";
import {Checkbox} from "../../../components/Checkbox";
import {DeleteButton} from "../../../components/DeleteButton";
import styled from "styled-components";
import {TaskEntityType} from "../../../state/tasks-reducer/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {useActions} from "../../../store/store";
import {tasksActions} from "../../../state/tasks-reducer";

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
});

const TaskContainer = styled.div`
  display: flex;
  padding: 3px 5px;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  margin-bottom: 8px;

  &:hover {
    background: bisque;
  }
`
