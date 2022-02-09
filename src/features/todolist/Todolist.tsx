import React, {useCallback} from "react";
import {AddItemInput} from "../../components/addItemInput/AddItemInput";
import {FilterValuesType} from "../../state/todoLists-reducer/todolists-reducer";
import {Task} from "./task/Task";
import {TodoTitle} from "../../components/todoListTitle/TodoTitle";
import {FilterBlock} from "../../components/FilterBlock";
import styled from "styled-components";
import {TaskEntityType} from "../../state/tasks-reducer/tasks-reducer";
import {RequestStatusType} from "../../state/app-reducer/app-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {useActions} from "../../store/store";
import {tasksActions} from "../../state/tasks-reducer";


export const Todolist = React.memo(({tasks, title, todoID, filter, todoEntityStatus}: ToDoListPropsType) => {
    let tasksForToDoList = tasks;
    const {createTask} = useActions(tasksActions);

    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((title: string) => {
        createTask({todoID, title});
    }, [todoID]);

    const mappedTasks = tasksForToDoList.map((t) => <Task key={t.id} todoID={todoID} task={t}/>)
    return (
        <StyledTodolist>
            <TodoTitle todoID={todoID} title={title} disabled={todoEntityStatus === 'loading'}/>
            <AddItemInput addNewItemTitle={addTask} disabled={todoEntityStatus === 'loading'}/>
            {mappedTasks}
            <FilterBlock filter={filter} todoID={todoID}/>
        </StyledTodolist>
    )
})

const StyledTodolist = styled.div`
  min-width: 320px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 10px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

`
type ToDoListPropsType = {
    tasks: TaskEntityType[]
    todoID: string
    title: string
    filter: FilterValuesType
    todoEntityStatus: RequestStatusType
}
