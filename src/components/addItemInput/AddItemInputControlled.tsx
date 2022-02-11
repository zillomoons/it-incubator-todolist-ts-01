import React, {ChangeEvent, KeyboardEvent} from "react";
import styled from "styled-components";
import {StyledIconButton} from "../DeleteButton";
import {IoAddCircleOutline} from "react-icons/all";


export const AddItemInputControlled = React.memo(({addNewItemTitle, disabled, style, newTitle, error, setNewTitle, setError}: PropsType) => {
    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError('');
        e.key === 'Enter' && addNewTitle()
    }
    const addNewTitle = () => {
        // const trimmedTitle = newTitle.trim();
        if (newTitle.trim()) {
            error && setError('');
            addNewItemTitle(newTitle.trim());
        } else {
            setError('Title is required')
        }
    }


    return (
        <StyledInputContainer>
            <div>
                <StyledInput value={newTitle}
                             style={style}
                             disabled={disabled}
                             onChange={onNewTaskChanged}
                             onKeyPress={onKeyPressHandler}
                             error={error}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <StyledIconButton style={style} size={28} onClick={addNewTitle} disabled={disabled}>
                <IoAddCircleOutline/>
            </StyledIconButton>
        </StyledInputContainer>
    )
});

const StyledInputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin: 10px auto;
`
const StyledInput = styled.input<{ error: string }>`
  width: 220px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.error.length ? 'red' : 'lightgrey'};
  padding: 5px 5px;
  font-size: 14px;
  background: transparent;

`
type PropsType = {
    addNewItemTitle: (title: string) => Promise<any>
    disabled?: boolean
    style?: Object
    error: string
    newTitle: string
    setError: (error: string)=> void
    setNewTitle: (value: string) => void
}
