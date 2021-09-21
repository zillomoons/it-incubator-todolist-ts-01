import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}
type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskID: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist = (props: ToDoListPropsType) => {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTasks(t.id)
                            }}>x
                            </button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() => {props.changeFilter('all')}}>All</button>
            <button onClick={() => {props.changeFilter('active')}}>Active</button>
            <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
}