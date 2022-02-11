import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import styled from "styled-components";

import {Todolist} from "./Todolist";
import {AddItemInput} from "../../components";
import {authSelectors} from "../login";
import {todolistsActions} from "../../state/todoLists-reducer";
import {selectTasks, selectTodoLists} from "./selectors";
import {useActions, useAppDispatch} from "../../store/redux-utils";


export const TodolistList = () => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector(selectTodoLists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const {getTodolists} = useActions(todolistsActions); //returns TC wrapped in callback - no need to use dispatch

    const addNewTodoList = useCallback(async (title: string) => {
        // createTodolist(title);
        const action = await dispatch(todolistsActions.createTodolist(title));
        if (todolistsActions.createTodolist.rejected.match(action)){
            if(action.payload?.errors?.length){
                const error = action.payload?.errors[0];
                throw new Error(error)
            } else {
                throw new Error('Some error occured')
            }
        }
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
            <div style={{width: '280px', margin: '50px auto'}}>
                <AddItemInput style={{color: 'white'}} addNewItemTitle={addNewTodoList} />
            </div>
            <StyledTodoContainer>
                {mappedTodoLists}
            </StyledTodoContainer>
        </>
    )
}
const StyledTodoContainer = styled.div`
  padding: 30px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
  
`

