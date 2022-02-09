import React from 'react';
import styled from "styled-components";


export const MyButton = React.memo(({name, callback, filter}: PropsType) => {
    const onClickHandler = () => {
        callback()
    }
    return <StyledFilterBtn onClick={onClickHandler} activeFilter={filter === name}>
        {name}
    </StyledFilterBtn>
})

type PropsType = {
    name: string
    callback: () => void
    filter?: string
}

const StyledFilterBtn = styled.button<{activeFilter : boolean}>`
  width: 100px;
  border-radius: 8px;
  padding: 3px 5px;
  background: white;
  border: 1px solid ${props => props.activeFilter ? 'darkcyan' : ' lightgrey'};
`
