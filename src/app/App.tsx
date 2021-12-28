import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/todolist/Todolist";
import {Header} from "../components/Header";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../store/store";
import {TaskStateType} from "../state/tasks-reducer/tasks-reducer";
import {getTodolists, TodolistEntityType} from "../state/todoLists-reducer/todolists-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "../state/app-reducer/app-reducer";
import {ErrorSnackBar} from "../common/ErrorSnackBar";


const App = () => {
    const todoLists = useAppSelector<TodolistEntityType[]>(state => state.todoLists);
    const tasks = useAppSelector<TaskStateType>(state => state.tasks);
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolists());
    }, [dispatch])
    const mappedTodoLists = todoLists.map(todo => {
        return <Todolist key={todo.id}
                         tasks={tasks[todo.id]}
                         todoEntityStatus={todo.entityStatus}
                         todoID={todo.id}
                         title={todo.title}
                         filter={todo.filter}/>
    })
    return (
        <div>
            <Header/>
            {status === 'loading' && <LinearProgress color='secondary'/>}
            <div className="TodoLists">
                {mappedTodoLists}
            </div>
            <ErrorSnackBar/>
        </div>
    );
};

export default App;
