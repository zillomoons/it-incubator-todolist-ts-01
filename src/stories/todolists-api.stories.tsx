import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API/todolist'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistsAPI.getTodolists().then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoTitle, setTodoTitle] = useState('');
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value);
    }

    const createTodo = () => {
        todolistsAPI.createTodolist(todoTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data)
                }
            });
    }
    return <div>
        <div>
            <input value={todoTitle} onChange={onChangeTitle}/>
            <button onClick={createTodo}>Create todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoID, setTodoID] = useState<string>('');
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value);
    }
    const onChangeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value);
    }
    const editTitle = () => {
        todolistsAPI.updateTodolist(todoID, todoTitle).then(res => setState(res.data.data));
    }

    return <div>
        <div>
            <input placeholder='todoID' value={todoID} onChange={onChangeTodoID}/>
            <input placeholder='todoTitle' value={todoTitle} onChange={onChangeTitle}/>
            <button onClick={editTitle}>Edit title</button>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todoID, setTodoID] = useState<string>('');
    const deleteTodo = () => {
        todolistsAPI.deleteTodolist(todoID).then(res => setState(res.data.messages));
    }
    const changeTodoID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoID(e.currentTarget.value);
    }
    return <div>
        <div>
            <input value={todoID} onChange={changeTodoID}/>
            <button onClick={deleteTodo}>Delete todolist</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

