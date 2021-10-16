import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";

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

export const Todolist = ({todoId, tasks, changeFilter, ...props}: ToDoListPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onNewTaskChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addNewTaskTitle = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle){
            props.addTask(trimmedTitle, todoId);
            setNewTaskTitle('')
        } else {
            setError(true)
        }

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addNewTaskTitle()
        }
    }
    const removeTodoList = () => props.removeTodoList(todoId);

    const filterHandler = (value: FilterValuesType) => changeFilter(value, todoId)
    const onRemoveHandler = (taskID: string) => {
        props.removeTask(taskID, todoId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        props.changeStatus(taskID, e.currentTarget.checked, todoId);
    }

    return <div>
        <h3>{props.title}
            <Button name={'x'} callback={removeTodoList} />
        </h3>
        <div>
            <input value={newTaskTitle}
                   placeholder={'Enter new task title'}
                   onChange={onNewTaskChanged}
                   className={error ? 'error' : ''}
                   onKeyPress={onKeyPressHandler}/>
            {/*<button onClick={addNewTaskTitle}>+</button>*/}
            <Button name={'ADD'} callback={addNewTaskTitle} />
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
        <ul>
            {
                tasks.map((t) => {
                    return (
                        <li key={t.id}  className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={(e)=>onChangeHandler(e, t.id)}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callback={()=>onRemoveHandler(t.id)} />
                        </li>
                    )
                })
            }
        </ul>
        <div>
            {/*<button className={props.filter === 'all' ? 'active-filter' : ''}*/}
            {/*        onClick={()=>filterHandler('all')}>All</button>*/}
            {/*<button className={props.filter === 'active' ? 'active-filter' : ''}*/}
            {/*        onClick={()=>filterHandler('active')}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? 'active-filter' : ''}*/}
            {/*        onClick={()=>filterHandler('completed')}>Completed</button>*/}
            <Button name={'all'} callback={()=>filterHandler('all')} />
            <Button name={'active'} callback={()=>filterHandler('active')} />
            <Button name={'completed'} callback={()=>filterHandler('completed')} />
        </div>
    </div>
}