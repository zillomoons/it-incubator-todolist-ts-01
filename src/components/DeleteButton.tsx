import {AiOutlineDelete} from "react-icons/all";
import React from "react";
import styled from "styled-components";

type PropsType = {
    callback: () => void
}

export const DeleteButton = React.memo(({callback}: PropsType) => {
    return <StyledIconButton color={'red'} onClick={callback}><AiOutlineDelete/></StyledIconButton>
});

export const StyledIconButton = styled.button<{
    size?: number,
    color?: string
}>`
  border: none;
  background: none;
  font-size: ${props => props.size ? props.size + 'px' : 'inherit'};
  color: ${props => props.color ? props.color : 'inherit'};
`
