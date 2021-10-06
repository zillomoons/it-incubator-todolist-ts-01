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
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: ToDoListPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addNewTaskTitle = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle){
            props.addTask(trimmedTitle);
            setNewTaskTitle('')
        } else {
            setError(true)
        }

    }
    const addNewTaskWithEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addNewTaskTitle()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   placeholder={'Enter new task title'}
                   onChange={onNewTaskChanged}
                   className={error ? 'error' : ''}
                   onKeyPress={addNewTaskWithEnter}/>
            <button onClick={addNewTaskTitle}>+</button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked);
                    }

                    return (
                        <li key={t.id}  className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}