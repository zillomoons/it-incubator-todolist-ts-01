import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {AddItemInput} from "./components/AddItemInput";
import {SpanWithEditMode} from "./components/SpanWithEditMode";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    todoId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string, todoID: string) => void
    changeFilter: (value: FilterValuesType, todoID: string) => void
    addTask: (titleTask: string, todoID: string) => void
    changeStatus: (id: string, isDone: boolean, todoID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoID: string) => void
    editTaskTitle: (todoID: string, taskID: string, title: string)=> void
    editTodoTitle: (todoID: string, title: string)=> void
}

export const Todolist = ({todoId, tasks, changeFilter, filter, ...props}: ToDoListPropsType) => {
    const addNewItemTitle = (title: string) => {
        props.addTask(title, todoId);
    }
    const removeTodoList = () => props.removeTodoList(todoId);

    const filterHandler = (value: FilterValuesType) => changeFilter(value, todoId)
    const onRemoveHandler = (taskID: string) => {
        props.removeTask(taskID, todoId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        props.changeStatus(taskID, e.currentTarget.checked, todoId);
    }
    const editTodoTitle = (title: string)=> {
        props.editTodoTitle(todoId, title)
    }

    return <div>
        <h3>
            <SpanWithEditMode title={props.title} editTitle={editTodoTitle} />
            <Button name={'x'} callback={removeTodoList} />
        </h3>
        <AddItemInput addNewItemTitle={addNewItemTitle} />
        <ul>
            {
                tasks.map((t) => {
                    const editTaskTitle = (title: string)=> {
                        props.editTaskTitle(todoId, t.id, title)
                    }
                    return (
                        <li key={t.id}  className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={(e)=>onChangeHandler(e, t.id)}
                                   checked={t.isDone}/>
                            <SpanWithEditMode title={t.title} editTitle={editTaskTitle}/>
                            <Button name={'x'} callback={()=>onRemoveHandler(t.id)} />
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button name={'all'} callback={()=>filterHandler('all')} filter={filter}/>
            <Button name={'active'} callback={()=>filterHandler('active')} filter={filter} />
            <Button name={'completed'} callback={()=>filterHandler('completed')} filter={filter}/>
        </div>
    </div>
}