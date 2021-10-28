import React from "react"
import {AddItemInput} from "./AddItemInput";
import styled from "styled-components";

type PropsType = {
    addNewTodoList: (title: string) => void
}

export const Header = ({addNewTodoList}: PropsType) => {
    return (
        <StyledHeaderContainer>
            <h3 style={{marginLeft: '15px'}}>Todo App</h3>
            <AddItemInput addNewItemTitle={addNewTodoList}/>
        </StyledHeaderContainer>
    )
}
const StyledHeaderContainer = styled.div`
  height: 60px;
  background: darkcyan;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
