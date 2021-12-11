import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const deleteTodoID = '26f8f79b-aa14-4093-b364-c2d6e9c05d21';
const updateTodoID = '4a04eca9-a697-41dc-a960-9525c26d605d';

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Dolzhit'})
    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Crocodile')
            .then(res => {
                if(res.data.resultCode === 0){
                    setState(res.data)
                }
            });
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(updateTodoID, 'BAZINGA!!!').then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist  = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(deleteTodoID).then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

