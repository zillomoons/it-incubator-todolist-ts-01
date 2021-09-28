import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (titleTask: string) => void
}

export const Todolist = (props: ToDoListPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addNewTaskTitle = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const addNewTaskWithEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            addNewTaskTitle()
        }
    }
    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle} onChange={onNewTaskChanged} onKeyPress={addNewTaskWithEnter}/>
            <button onClick={addNewTaskTitle}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => {props.removeTask(t.id)}
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}