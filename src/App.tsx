import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {
    AddNewTodoAC,
    EditTodoTitleAC,
    RemoveTodoListAC,
    TodoListType
} from "./state/todoListReducer";
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";


const App = () => {

    //functions for todoList
    let dispatch = useDispatch();
    const todoLists = useSelector<rootReducerType, TodoListType[]>(state => state.todoLists);

    const addNewTodoList = (title: string) => {
        // const newTodoID = v1();
        dispatch(AddNewTodoAC(title));
    }
    const removeTodoList = (todoID: string) => {
        dispatch(RemoveTodoListAC(todoID));
    }
    const editTodoTitle = (todoID: string, title: string) => {
        dispatch(EditTodoTitleAC(todoID, title));
    }
    //functions for tasks

    const mappedTodoLists = todoLists.map(todo => {

            return <Todolist key={todo.id}
                             todoID={todo.id}
                             removeTodoList={()=>removeTodoList(todo.id)}
                             title={todo.title}
                             editTodoTitle={(title)=>editTodoTitle(todo.id, title)}
                             filter={todo.filter}/>
        })
    return (
        <div>
            <Header addNewTodoList={addNewTodoList}/>
            <div className="TodoLists">
                {mappedTodoLists}
            </div>
        </div>
    );
}

export default App;
