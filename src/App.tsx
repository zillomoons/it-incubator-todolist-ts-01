import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {

    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "GraphGL", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => taskID !== t.id))
    }
    const addTask = (titleTask: string) => {
        let newTask = {id: v1(), title: titleTask, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
        const updatedTaskStatus = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t);
        setTasks(updatedTaskStatus);
    }

    let tasksForToDoList = tasks;

    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasksForToDoList}
                      removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask} changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
