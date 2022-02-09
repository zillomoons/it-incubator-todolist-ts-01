import React, {useCallback, useEffect} from "react";
import {useActions, useAppSelector} from "../../store/store";
import {TodolistEntityType} from "../../state/todoLists-reducer/todolists-reducer";
import {TaskStateType} from "../../state/tasks-reducer/tasks-reducer";
import { useSelector} from "react-redux";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";
import {AddItemInput} from "../../components/addItemInput/AddItemInput";
import styled from "styled-components";
import {authSelectors} from "../login";
import {todolistsActions} from "../../state/todoLists-reducer";


export const TodolistList = () => {
    const todoLists = useAppSelector<TodolistEntityType[]>(state => state.todoLists);
    const tasks = useAppSelector<TaskStateType>(state => state.tasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const {createTodolist, getTodolists} = useActions(todolistsActions); //returns TC wrapped in callback - no need to use dispatch

    const addNewTodoList = useCallback((title: string) => {
        createTodolist(title);
    }, []) ;

    useEffect(() => {
        if (!isLoggedIn) return;
        getTodolists();
    }, [isLoggedIn])

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
