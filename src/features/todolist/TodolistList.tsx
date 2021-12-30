import {ErrorSnackBar} from "../../common/ErrorSnackBar";
import React, {useCallback, useEffect} from "react";
import {useAppSelector} from "../../store/store";
import {createTodolist, getTodolists, TodolistEntityType} from "../../state/todoLists-reducer/todolists-reducer";
import {TaskStateType} from "../../state/tasks-reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";
import {AddItemInput} from "../../components/addItemInput/AddItemInput";
import styled from "styled-components";

export const TodolistList = () => {
    const todoLists = useAppSelector<TodolistEntityType[]>(state => state.todoLists);
    const tasks = useAppSelector<TaskStateType>(state => state.tasks);
    const isLoggedIn = useAppSelector<boolean>(state=> state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]) ;

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(getTodolists());
    }, [dispatch, isLoggedIn])

    const mappedTodoLists = todoLists.map(todo => {
        return <Todolist key={todo.id}
                         tasks={tasks[todo.id]}
                         todoEntityStatus={todo.entityStatus}
                         todoID={todo.id}
                         title={todo.title}
                         filter={todo.filter}/>
    })
    if (!isLoggedIn){
        return <Navigate to='/login' />
    }
    return (
        <>
            <AddItemInput addNewItemTitle={addNewTodoList} />
            <StyledTodoContainer>
                {mappedTodoLists}
            </StyledTodoContainer>
            <ErrorSnackBar/>
        </>
    )
}
const StyledTodoContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;
  justify-content: space-evenly;
`