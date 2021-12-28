import React, {useCallback, useEffect} from "react";
import {AddItemInput} from "../../components/addItemInput/AddItemInput";
import {deleteTodolist, FilterValuesType, updateTodoTitle} from "../../state/todoLists-reducer/todolists-reducer";
import {Task} from "./task/Task";
import {TodoTitle} from "../../components/todoListTitle/TodoTitle";
import {FilterBlock} from "../../components/FilterBlock";
import styled from "styled-components";
import {createTask, getTasks, TaskEntityType} from "../../state/tasks-reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "../../state/app-reducer/app-reducer";
import {TaskStatuses} from "../../api/todolists-api";


type ToDoListPropsType = {
    tasks: TaskEntityType[]
    todoID: string
    title: string
    filter: FilterValuesType
    todoEntityStatus: RequestStatusType
}

export const Todolist = React.memo(({tasks, title, todoID, filter, todoEntityStatus}: ToDoListPropsType) => {
    const dispatch = useDispatch();
    let tasksForToDoList = tasks;

    useEffect(()=> {
        dispatch(getTasks(todoID));
    }, [todoID, dispatch])

    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.Completed)
    }
    const removeTodoList = useCallback(() => {
        dispatch(deleteTodolist(todoID));
    }, [dispatch, todoID])
    const editTodoTitle = useCallback((title: string) => {
        dispatch(updateTodoTitle(todoID, title));
    }, [dispatch, todoID])
    const addTask = useCallback((title: string) => {
        dispatch(createTask(todoID, title));
    }, [dispatch, todoID])

    const mappedTasks = tasksForToDoList.map((t) => <Task key={t.id} todoID={todoID} task={t}/>)
    return (
        <StyledTodolist>
            <TodoTitle title={title} editTodoTitle={editTodoTitle} disabled={todoEntityStatus === 'loading'} removeTodoList={removeTodoList}/>
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