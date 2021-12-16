import React, {useCallback} from "react"
import {AddItemInput} from "./addItemInput/AddItemInput";
import styled from "styled-components";
import {createTodolist} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";

export const Header = React.memo(() => {
    let dispatch = useDispatch();
    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]) ;
    return (
        <StyledHeaderContainer>
            <h3 style={{marginLeft: '15px'}}>Todo App</h3>
            <AddItemInput addNewItemTitle={addNewTodoList}/>
        </StyledHeaderContainer>
    )
})
const StyledHeaderContainer = styled.div`
  height: 60px;
  background: darkcyan;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
