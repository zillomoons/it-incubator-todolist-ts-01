import React, {ChangeEvent} from "react";
import styled from "styled-components";

type PropsType = {
    isDone: boolean
    changeStatus: (isDone: boolean) => void
}

export const Checkbox = React.memo( ({isDone, changeStatus}: PropsType) => {
    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=>changeStatus(e.currentTarget.checked);
    return (
        <CheckboxContainer>
            <HiddenCheckbox checked={isDone}
                            onChange={onChangeHandler} />
            <StyledCheckbox checked={isDone}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    )
} )

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

const StyledCheckbox = styled.div<{checked : boolean}>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props =>props.checked ? 'salmon' : 'papayawhip'};
  border-radius: 50%;
  transition: all 150ms;
  
  ${HiddenCheckbox}:focus + & {box-shadow: 0 0 0 3px pink;}
  ${Icon} { visibility: ${props => props.checked ? 'visible' : 'hidden'}
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
`