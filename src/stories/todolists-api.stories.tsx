import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API/todolist'
}

const deleteTodoID = '1cbf3bf8-5df3-4361-b76b-ab03102ca398';
const updateTodoID = 'da3264ab-7cbf-4c22-b949-4e96414c7f0f';

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(res => setState(res.data.map(todo => `TodoID: ${todo.id}. Title: ${todo.title}`)));
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
                    setState(res.data.data.item.title)
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

