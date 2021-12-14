import React, {ChangeEvent} from "react";
import styled from "styled-components";
import {TaskStatuses} from "../api/tasks-api";

type PropsType = {
    status: TaskStatuses
    changeStatus: (status: TaskStatuses) => void
}

export const Checkbox = React.memo(({status, changeStatus}: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? changeStatus(TaskStatuses.Completed)
            : changeStatus(TaskStatuses.New)
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
  background: ${props => props.checked ? 'salmon' : 'papayawhip'};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
`