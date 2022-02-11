import React from 'react';
import styled from "styled-components";


export const MyButton = React.memo(({text, onClick, filter}: PropsType) => {

    return <StyledFilterBtn onClick={onClick} activeFilter={filter === text}>
        {text}
    </StyledFilterBtn>
})

type PropsType = {
    text: string
    onClick: () => void
    filter?: string
}

const StyledFilterBtn = styled.button<{activeFilter : boolean}>`
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
  padding: 3px 5px;
  background: white;
  border: 1px solid ${props => props.activeFilter ? 'darkcyan' : ' lightgrey'};
  transition: all 0.3s ease-in-out;

  &:hover{
    box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  }
`
