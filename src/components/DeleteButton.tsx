import {AiOutlineDelete} from "react-icons/all";
import React from "react";
import styled from "styled-components";

type PropsType = {
    callback: () => void
    disabled: boolean
}

export const DeleteButton = React.memo(({callback, disabled}: PropsType) => {

    return <StyledIconButton color={'red'} disabled={disabled} onClick={callback}><AiOutlineDelete/></StyledIconButton>
});

export const StyledIconButton = styled.button<{
    size?: number,
    color?: string
}>`
  border: none;
  background: none;
  font-size: ${props => props.size ? props.size + 'px' : 'inherit'};
  color: ${props => props.color ? props.color : 'inherit'};
  
  &:disabled{
    color: darkgrey;
  }
`


