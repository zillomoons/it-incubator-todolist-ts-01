import React from 'react';

type PropsType={
    name: string
    callback: ()=>void
}

export const Button = ({name, callback, ...props}: PropsType) =>{
    const onClickHandler=()=> {
        callback()
    }
    return <button onClick={onClickHandler}>{name}</button>
}