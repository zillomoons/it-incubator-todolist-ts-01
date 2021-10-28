import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styled from "styled-components";

type PropsType = {
    title: string
    editTitle: (title: string) => void

}

export const SpanWithEditMode = ({title, editTitle}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setValue(title);
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && deactivateEditMode()
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        value.trim() && editTitle(value)
    }
    return editMode
        ? <StyledInput value={value} onChange={onInputChange}
                 onKeyPress={onKeyPressHandler}
                 onBlur={deactivateEditMode} autoFocus/>
        : <StyledSpan onDoubleClick={activateEditMode}>{title}</StyledSpan>
}
const StyledInput = styled.input`
  display: inline;
  margin: 0;
  width: 180px;
  outline: none;
  border: none;
  color: lightslategrey;
`
const StyledSpan = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
`

