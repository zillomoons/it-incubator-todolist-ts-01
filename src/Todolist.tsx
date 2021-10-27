import React from "react";
import {AddItemInput} from "./components/AddItemInput";
import {FilterValuesType} from "./state/todoListReducer";
import {Task} from "./components/Task";
import {TodoTitle} from "./components/TodoTitle";
import {FilterBlock} from "./components/FilterBlock";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    todoID: string
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: () => void
    editTaskTitle: (taskID: string, title: string) => void
    editTodoTitle: (title: string) => void
}

export const Todolist = ({
                             title, tasks, changeFilter, filter,
                             removeTask, addTask, changeStatus,
                             editTaskTitle, editTodoTitle, removeTodoList
                         }: ToDoListPropsType) => {

    const mappedTasks = tasks.map((t) => {
        return <Task key={t.id}
                     title={t.title}
                     isDone={t.isDone}
                     changeStatus={(isDone) => changeStatus(t.id, isDone)}
                     editTaskTitle={(title) => editTaskTitle(t.id, title)}
                     removeTask={() => removeTask(t.id)}/>

    })
    return <div>
        <TodoTitle title={title} editTodoTitle={editTodoTitle} removeTodoList={removeTodoList}/>
        <AddItemInput addNewItemTitle={addTask}/>
        {mappedTasks}
        <FilterBlock filter={filter} changeFilter={changeFilter}/>
    </div>
}