import React, {useCallback, useEffect} from "react";
import {useActions} from "../../store/store";
import {useSelector} from "react-redux";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";
import {AddItemInput} from "../../components/addItemInput/AddItemInput";
import styled from "styled-components";
import {authSelectors} from "../login";
import {todolistsActions} from "../../state/todoLists-reducer";
import {selectTasks, selectTodoLists} from "./selectors";


export const TodolistList = () => {
    const todoLists = useSelector(selectTodoLists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const {createTodolist, getTodolists} = useActions(todolistsActions); //returns TC wrapped in callback - no need to use dispatch

    const addNewTodoList = useCallback((title: string) => {
        createTodolist(title);
    }, []) ;

    useEffect(() => {
        if (!isLoggedIn) return;
        getTodolists();
    }, [isLoggedIn])

    const mappedTodoLists = todoLists.map(tl => {
        return <Todolist key={tl.id}
                         tasks={tasks[tl.id]}
                         todoEntityStatus={tl.entityStatus}
                         todoID={tl.id}
                         title={tl.title}
                         filter={tl.filter}/>
    });

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
