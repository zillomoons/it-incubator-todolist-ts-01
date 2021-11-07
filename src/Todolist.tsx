import React from "react";
import {AddItemInput} from "./components/AddItemInput";
import {FilterValuesType} from "./state/todoListReducer";
import {Task} from "./components/Task";
import {TodoTitle} from "./components/TodoTitle";
import {FilterBlock} from "./components/FilterBlock";
import styled from "styled-components";
import {AddTaskAC, ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC, TaskStateType} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    todoID: string
    title: string
    filter: FilterValuesType
    removeTodoList: () => void
    editTodoTitle: (title: string) => void
}

export const Todolist = ({
                             title, todoID, filter, editTodoTitle, removeTodoList
                         }: ToDoListPropsType) => {

    const tasks = useSelector<rootReducerType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    let tasksForToDoList = tasks[todoID];
    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
    }
    const removeTask = (taskID: string) => {
        dispatch(RemoveTaskAC(todoID, taskID));
    }
    const addTask = (title: string) => {
        dispatch(AddTaskAC(todoID, title));
    }
    const editTaskTitle = (taskID: string, title: string) => {
        dispatch(EditTaskTitleAC(todoID, taskID, title));
    }
    const changeStatus = (taskID: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoID, taskID, isDone));
    }
    const mappedTasks = tasksForToDoList.map((t) => {
        return <Task key={t.id}
                     title={t.title}
                     isDone={t.isDone}
                     changeStatus={(isDone) => changeStatus(t.id, isDone)}
                     editTaskTitle={(title) => editTaskTitle(t.id, title)}
                     removeTask={() => removeTask(t.id)}/>

    })
    return <StyledTodolist>
        <TodoTitle title={title} editTodoTitle={editTodoTitle} removeTodoList={removeTodoList}/>
        <AddItemInput addNewItemTitle={addTask}/>
        {mappedTasks}
        <FilterBlock filter={filter} todoID={todoID}/>
    </StyledTodolist>
}

const StyledTodolist = styled.div`
  min-width: 320px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 10px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

`