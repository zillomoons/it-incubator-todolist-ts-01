import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = { [key: string]: TaskType[] }

const App = () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphGL", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Honey", isDone: false},
            {id: v1(), title: "Cookies", isDone: false},
        ]
    })

    const removeTodoList = (todoID: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoID))
        delete tasks[todoID];
    }
    const removeTask = (taskID: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID)})
    }
    const addTask = (titleTask: string, todoListId: string) => {
        let newTask = {id: v1(), title: titleTask, isDone: false};
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    const changeFilter = (value: FilterValuesType, todoID: string) => {
        setTodoLists(todoLists.map(todo => todo.id === todoID ? {...todo, filter: value} : todo))
    }
    return (
        <div className="App">
            {
                todoLists.map(todo => {
                        let tasksForToDoList = tasks[todo.id];
                        if (todo.filter === 'active') {
                            tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                        }
                        if (todo.filter === 'completed') {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                        }
                        return <Todolist key={todo.id} removeTodoList={removeTodoList}
                                         title={todo.title} todoId={todo.id}
                                         tasks={tasksForToDoList}
                                         removeTask={removeTask} changeFilter={changeFilter}
                                         addTask={addTask} changeStatus={changeStatus}
                                         filter={todo.filter}/>
                    }
                )}
        </div>
    );
}

export default App;
