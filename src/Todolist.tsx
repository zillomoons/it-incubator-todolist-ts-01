import React, {useCallback} from "react";
import {AddItemInput} from "./components/addItemInput/AddItemInput";
import {EditTodoTitleAC, FilterValuesType, RemoveTodoListAC} from "./state/todoListReducer";
import {Task} from "./components/task/Task";
import {TodoTitle} from "./components/todoListTitle/TodoTitle";
import {FilterBlock} from "./components/FilterBlock";
import styled from "styled-components";
import {AddTaskAC} from "./state/tasksReducer";
import {useDispatch} from "react-redux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    tasks: TaskType[]
    todoID: string
    title: string
    filter: FilterValuesType
}

export const Todolist = React.memo(({tasks, title, todoID, filter}: ToDoListPropsType) => {
    const dispatch = useDispatch();
    let tasksForToDoList = tasks;
    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
    }
    const removeTodoList = useCallback(() => {
        dispatch(RemoveTodoListAC(todoID));
    }, [dispatch, todoID])
    const editTodoTitle = useCallback((title: string) => {
        dispatch(EditTodoTitleAC(todoID, title));
    }, [dispatch, todoID])
    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(todoID, title));
    }, [dispatch, todoID])

    const mappedTasks = tasksForToDoList.map((t) => <Task key={t.id} todoID={todoID}
                                                          taskID={t.id}
                                                          title={t.title}
                                                          isDone={t.isDone}/>)
    return (
        <StyledTodolist>
            <TodoTitle title={title} editTodoTitle={editTodoTitle} removeTodoList={removeTodoList}/>
            <AddItemInput addNewItemTitle={addTask}/>
            {mappedTasks}
            <FilterBlock filter={filter} todoID={todoID}/>
        </StyledTodolist>
    )
})

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