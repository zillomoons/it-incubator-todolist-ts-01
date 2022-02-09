import {RequestStatusType} from "../app-reducer/app-reducer";
import {TaskType} from "../../api/todolists-api";
import {createSlice} from "@reduxjs/toolkit";
import {createTask, deleteTask, getTasks, updateTask} from "./tasks-actions";
import {createTodolist, deleteTodolist, getTodolists} from "../todoLists-reducer/todolists-actions";

//ResultCode statuses - indicates whether request to server was successful
export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10
}


const initialState: TaskStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTodolist.fulfilled, (state, action) => {
                state[action.payload.tl.id] = [];
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todoID];
            })
            .addCase(getTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = []);
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todoID] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}));
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoID];
                const index = tasks.findIndex(t => t.id === action.payload.taskID);
                if (index > -1) tasks.splice(index, 1);
            })
            .addCase(createTask.fulfilled, (state, action) => {
                const tlId = action.payload.task.todoListId;
                state[tlId].unshift({...action.payload.task, entityStatus: 'idle'})
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tlId = action.payload.todoID;
                const index = state[tlId].findIndex(t => t.id === action.payload.taskID);
                if (index > -1) state[tlId][index] = {...state[tlId][index], ...action.payload.model}
            })
    }
})

export const tasksReducer = slice.reducer;


//Types
export type TaskStateType = { [key: string]: TaskEntityType[] }
export type TaskEntityType = TaskType & {
    entityStatus: RequestStatusType
}



