import React, { useState} from "react";
import {tasksAPI} from "./tasks-api";

export default {
    title: 'API/tasks',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todoID, setTodoID] = useState('');
    const getTasks = () => {
        tasksAPI.getTasks(todoID).then(res => {
            setState(res.data)

        })
    }

    return <div>
        <div>
            <input placeholder='todoID' value={todoID} onChange={e => setTodoID(e.target.value)}/>
        </div>
        <button onClick={getTasks}>Show tasks</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoID, setTodoID] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const createTask = () => {
        tasksAPI.createTask(todoID, taskTitle).then(res => setState(res.data.data));
    }
    return <div>
        <div>
            <input placeholder='todoID' value={todoID} onChange={e => setTodoID(e.target.value)}/>
            <input placeholder='taskTitle' value={taskTitle} onChange={e => setTaskTitle(e.target.value)}/>
        </div>
        <div>
            <button onClick={createTask}>Create task</button>
        </div>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoID, setTodoID] = useState('');
    const [taskID, setTaskID] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const editTask = () => {
        tasksAPI.updateTask(todoID, taskID, { title: taskTitle, deadline: null,
            description: '', priority: 1, startDate: '', status: 1 }).then(res => setState(res.data));
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder='todoID' value={todoID} onChange={e => setTodoID(e.target.value)}/>
            <input placeholder='taskID' value={taskID} onChange={e => setTaskID(e.target.value)}/>
            <input placeholder='taskTitle' value={taskTitle} onChange={e => setTaskTitle(e.target.value)}/>
        </div>
        <button onClick={editTask}>Edit task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoID, setTodoID] = useState('');
    const [taskID, setTaskID] = useState('');
    const deleteTask = () => {
        tasksAPI.deleteTask(todoID, taskID).then(res => setState(res.data));
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todoID' value={todoID} onChange={e => setTodoID(e.target.value)}/>
            <input placeholder='taskID' value={taskID} onChange={e => setTaskID(e.target.value)}/>
        </div>
        <button onClick={deleteTask}>Delete task</button>
    </div>
}
