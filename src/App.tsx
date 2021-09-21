import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = React.useState< Array<TaskType> >([
        { id: 1, title: "HTML&CSS", isDone: true},
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "ReactJS", isDone: false},
        { id: 4, title: "Redux", isDone: false},
        { id: 5, title: "RestAPI", isDone: false},
        { id: 6, title: "GraphGL", isDone: false}
    ])

    const removeTasks = (taskID: number) => {
        setTasks(tasks.filter( t => taskID !== t.id))
    }
    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForToDoList = tasks;

    if (filter === 'active'){
        tasksForToDoList = tasks.filter( t => !t.isDone)
    }
    if (filter === 'completed'){
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasksForToDoList}
                      removeTasks={removeTasks} changeFilter={changeFilter} />
        </div>
    );
}

export default App;
