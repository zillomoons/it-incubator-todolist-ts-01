import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemInput} from "./components/AddItemInput";
import {
    AddNewTodoAC,
    ChangeFilterAC,
    EditTodoTitleAC, FilterValuesType,
    RemoveTodoListAC, todoListId_1, todoListId_2,
    todoListReducer
} from "./state/todoListReducer";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    EditTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
} from "./state/tasksReducer";
import {Header} from "./components/Header";


const App = () => {

    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    //functions for todoList

    const addNewTodoList = (title: string) => {

        const newTodoID = v1();
        dispatchTodoLists(AddNewTodoAC(newTodoID,title))
        dispatchTasks(AddNewTodoAC(newTodoID,title))
    }
    const changeFilter = (todoID: string, value: FilterValuesType,) => {
        dispatchTodoLists(ChangeFilterAC(todoID, value))
    }
    const removeTodoList = (todoID: string) => {
        dispatchTodoLists(RemoveTodoListAC(todoID))
        delete tasks[todoID];
    }
    const editTodoTitle = (todoID: string, title: string) => {
        dispatchTodoLists(EditTodoTitleAC(todoID, title))
    }
    //functions for tasks
    const removeTask = (todoID: string, taskID: string) => {
        dispatchTasks(RemoveTaskAC(todoID, taskID))
    }
    const addTask = (todoID: string, title: string) => {
        dispatchTasks(AddTaskAC(todoID, title))
    }
    const editTaskTitle = (todoID: string, taskID: string, title: string) => {
        dispatchTasks(EditTaskTitleAC(todoID, taskID, title))
    }
    const changeStatus = (todoID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(ChangeTaskStatusAC(todoID, taskID, isDone))
    }
    const mappedTodoLists = todoLists.map(todo => {
            let tasksForToDoList = tasks[todo.id];
            if (todo.filter === 'active') {
                tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
            }
            if (todo.filter === 'completed') {
                tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
            }
            return <Todolist key={todo.id}
                             removeTodoList={()=>removeTodoList(todo.id)}
                             title={todo.title} todoID={todo.id}
                             tasks={tasksForToDoList}
                             removeTask={(taskID)=>removeTask(todo.id, taskID)}
                             changeFilter={(value)=>changeFilter(todo.id, value)}
                             addTask={(title)=>addTask(todo.id, title)}
                             changeStatus={(taskID, isDone)=>changeStatus(todo.id, taskID, isDone)}
                             editTaskTitle={(taskID, title)=>editTaskTitle(todo.id, taskID, title)}
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
