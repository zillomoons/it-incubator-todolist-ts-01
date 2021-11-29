import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {
    TodoListType
} from "./state/todoListReducer";
import {Header} from "./components/Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStateType} from "./state/tasksReducer";


const App =() => {
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
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
