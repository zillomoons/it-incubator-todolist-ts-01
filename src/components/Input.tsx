import React, {ChangeEvent, KeyboardEvent} from "react";

type PropsType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>)=> void
    error?: boolean
}

export const Input = ({value, onChange, onKeyPress, ...props}: PropsType) => {
    return (
        <div>
            <input value={value}
                   placeholder={'Enter new title'}
                   onChange={onChange}
                   className={props.error ? 'error' : ''}
                   onKeyPress={onKeyPress}/>
            {props.error && <div className={'error-message'}>Title is required</div>}
        </div>
)}