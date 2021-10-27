import React from 'react';

type PropsType={
    name: string
    callback: ()=>void
    filter?: string
}

export const MyButton = ({name, callback, ...props}: PropsType) =>{
    const onClickHandler=()=> {
        callback()
    }
    return <button onClick={onClickHandler} className={props.filter === name ? "activeFilter" : ""}>
            {name}
        </button>
}