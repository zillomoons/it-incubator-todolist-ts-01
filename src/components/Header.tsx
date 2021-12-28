import React, {useCallback} from "react"
import {AddItemInput} from "./addItemInput/AddItemInput";
import styled from "styled-components";
import {createTodolist} from "../state/todoLists-reducer/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../store/store";
import {RequestStatusType} from "../state/app-reducer/app-reducer";

export const Header = React.memo(() => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();
    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]) ;
    return (
        <StyledHeaderContainer>
            <h3 style={{marginLeft: '15px'}}>Todo App</h3>
            <AddItemInput addNewItemTitle={addNewTodoList} disabled={status === 'loading'}/>
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
