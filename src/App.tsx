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
export type TaskStateType = {
    [key: string]: TaskType[]
}

const App = () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'completed'},
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
        let filteredTodoLists = todoLists.filter(todo => todo.id !== todoID);
        setTodoLists(filteredTodoLists);
        delete tasks[todoID];
        // setTasks({...tasks});
        console.log(tasks)
    }
    const removeTask = (taskID: string, todoListId: string) => {
        let todoTasks = tasks[todoListId];
        tasks[todoListId] = todoTasks.filter(t => taskID !== t.id)
        setTasks({...tasks})
    }
    const addTask = (titleTask: string, todoListId: string) => {
        let todoTasks = tasks[todoListId];
        let newTask = {id: v1(), title: titleTask, isDone: false};
        tasks[todoListId] = [newTask, ...todoTasks];
        setTasks({...tasks})
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let todoTasks = tasks[todoListId];
        tasks[todoListId] = todoTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t);
        setTasks({...tasks});
    }

    const changeFilter = (value: FilterValuesType, todoID: string) => {
        const updatedTodoFilter = todoLists.map(todo => todo.id === todoID ? {...todo, filter: value} : todo);
        setTodoLists(updatedTodoFilter);
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
