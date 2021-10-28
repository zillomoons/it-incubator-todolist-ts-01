import React from 'react';
import styled from "styled-components";

type PropsType = {
    name: string
    callback: () => void
    filter?: string
}

export const MyButton = ({name, callback, ...props}: PropsType) => {
    const onClickHandler = () => {
        callback()
    }
    return <StyledFilterBtn onClick={onClickHandler} activeFilter={props.filter === name}>
        {name}
    </StyledFilterBtn>
}

const StyledFilterBtn = styled.button<{activeFilter : boolean}>`
  width: 100px;
  border-radius: 8px;
  padding: 3px 5px;
  background: white;
  border: 1px solid ${props => props.activeFilter ? 'darkcyan' : ' lightgrey'};
`