import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/todolist/Todolist";
import {Header} from "../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TaskStateType} from "../state/tasks-reducer";
import {getTodolists, TodolistEntityType} from "../state/todolists-reducer";


const App =() => {
    const todoLists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTodolists());
        }, [dispatch])
    const mappedTodoLists = todoLists.map(todo => {
        return <Todolist key={todo.id}
                         tasks={tasks[todo.id]}
                         todoID={todo.id}
                         title={todo.title}
                         filter={todo.filter}/>
    })
    return (
        <div>
            <Header />
            <div className="TodoLists">
                {mappedTodoLists}
            </div>
        </div>
    );
};

export default App;
