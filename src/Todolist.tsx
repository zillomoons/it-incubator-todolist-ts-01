import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoID: string) => void
    changeFilter: (value: FilterValuesType, todoID: string) => void
    addTask: (titleTask: string, todoID: string) => void
    changeStatus: (id: string, isDone: boolean, todoID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoID: string) => void
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
            props.addTask(trimmedTitle, props.todoId);
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
    const onAllClickHandler = () => props.changeFilter('all', props.todoId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todoId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todoId)

    const removeTodoList = () => props.removeTodoList(props.todoId);

    return <div>
        <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
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
                        props.removeTask(t.id, props.todoId)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.todoId);
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