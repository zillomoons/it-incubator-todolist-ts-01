import React, {ChangeEvent} from "react";
import styled from "styled-components";
import {TaskStatuses} from "../api/todolists-api";

type PropsType = {
    status: TaskStatuses
    changeStatus: (status: TaskStatuses) => void
}

export const Checkbox = React.memo(({status, changeStatus}: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={status === TaskStatuses.Completed}
                            onChange={onChangeHandler}/>
            <StyledCheckbox checked={status === TaskStatuses.Completed}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    )
})

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 5px;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => props.checked ? 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)' : 'rgba(203,243,222,0.4)'};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 1px #7cf5c4;
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
`
