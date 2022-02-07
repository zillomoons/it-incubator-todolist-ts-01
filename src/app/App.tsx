import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {TodolistList} from "../features/todolist/TodolistList";
import {Login} from "../features/login/Login";
import {Header} from "../components/Header";
import {initializeApp} from "../state/app-reducer/app-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../store/store";
import CircularProgress from "@mui/material/CircularProgress";
import {ErrorSnackBar} from "../common/ErrorSnackBar";


const App = () => {
    const dispatch = useDispatch();
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch])

    if (!isInitialized){
        return <div style={{position: 'fixed', top: '30%', textAlign: "center", width: '100%'}}>
            <CircularProgress />
        </div>
    }
    return (
        <BrowserRouter>
            <ErrorSnackBar/>
            <Header/>
            <Routes>
                <Route path='/' element={<TodolistList/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>
        </BrowserRouter>

    );
};

export default App;
