import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RequestStatusType} from "../app-reducer/app-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../../api/todolists-api";
import {asyncActions as todolistsActions} from '../todoLists-reducer/todolists-reducer'
import {preloaderControl} from "../../utils/preloaderControl";
import {handleAsyncNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import {AppRootStateType, ThunkErrorType} from "../../store/store";
import {appActions} from "../app-reducer/app-common-actions";


//ResultCode statuses - indicates whether request to server was successful
export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10
}

//AsyncActions
const getTasks = createAsyncThunk<{todoID: string, tasks: TaskType[]}, string, ThunkErrorType>(
    'tasks/fetchTasks',
    async (todoID, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch);
        try {
            const {data} = await todolistsAPI.getTasks(todoID);
            return {todoID, tasks: data.items};
        } catch (error: any) {
            return handleAsyncNetworkError(error, thunkAPI);
        } finally {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'idle'}))
        }
    })
const deleteTask = createAsyncThunk<{todoID: string, taskID: string}, { todoID: string, taskID: string }, ThunkErrorType >(
    'tasks/deleteTask',
    async (param, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch, param.todoID, param.taskID);

        try {
            const {data} = await todolistsAPI.deleteTask(param);
            if (data.resultCode === ResultCodes.success) {
                return {todoID: param.todoID, taskID: param.taskID};
            } else {
                return handleAsyncServerAppError(data, thunkAPI);
            }
        } catch (error: any) {
            return handleAsyncNetworkError(error, thunkAPI);
        } finally {
            preloaderControl('idle', thunkAPI.dispatch, param.todoID, param.taskID)
        }
    })
const createTask = createAsyncThunk<TaskType, { todoID: string, title: string }, ThunkErrorType>(
    'tasks/createTask',
    async (param,thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch, param.todoID);

        try {
            const {data} = await todolistsAPI.createTask(param.todoID, param.title)
            if (data.resultCode === ResultCodes.success) {
                return data.data.item;
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (error: any) {
           return handleAsyncNetworkError(error, thunkAPI);
        } finally {
            preloaderControl('idle', thunkAPI.dispatch, param.todoID);
        }
    })
const updateTask = createAsyncThunk<UpdateTaskParamType, UpdateTaskParamType, ThunkErrorType>(
    'tasks/updateTask',
    async (param, thunkAPI
    ) => {
        preloaderControl('loading', thunkAPI.dispatch, param.todoID, param.taskID);
        const state = thunkAPI.getState() as AppRootStateType;
        const currentTask = state.tasks[param.todoID].find(t => t.id === param.taskID);
        try {
            if (currentTask) {
                const {data} = await todolistsAPI.updateTask(param.todoID, param.taskID, {
                    title: currentTask.title,
                    startDate: currentTask.startDate,
                    priority: currentTask.priority,
                    description: currentTask.description,
                    deadline: currentTask.deadline,
                    status: currentTask.status,
                    ...param.model
                })
                if (data.resultCode === ResultCodes.success) {
                    return param;
                } else {
                    return handleAsyncServerAppError(data, thunkAPI);
                }
            }
        } catch (error: any) {
            handleAsyncNetworkError(error, thunkAPI)

        } finally {
            preloaderControl('idle', thunkAPI.dispatch, param.todoID, param.taskID)
        }
    })

export const asyncActions = {
    getTasks,
    deleteTask,
    createTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {
        changeTaskEntityStatus(state, action: PayloadAction<{ todoID: string, taskID: string, status: RequestStatusType }>) {
            const tlId = action.payload.todoID;
            const index = state[tlId].findIndex(t => t.id === action.payload.taskID);
            if (index > -1) state[tlId][index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.createTodolist.fulfilled, (state, action) => {
                state[action.payload.id] = [];
            })
            .addCase(todolistsActions.deleteTodolist.fulfilled, (state, action) => {
                delete state[action.payload];
            })
            .addCase(todolistsActions.getTodolists.fulfilled, (state, action) => {
                action.payload.forEach(tl => state[tl.id] = []);
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
                const tlId = action.payload.todoListId;
                state[tlId].unshift({...action.payload, entityStatus: 'idle'})
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tlId = action.payload.todoID;
                const index = state[tlId].findIndex(t => t.id === action.payload.taskID);
                if (index > -1) state[tlId][index] = {...state[tlId][index], ...action.payload.model}
            })
    }
});


//Types
export type TaskStateType = { [key: string]: TaskEntityType[] }
export type TaskEntityType = TaskType & {
    entityStatus: RequestStatusType
}
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type UpdateTaskParamType = { todoID: string, taskID: string, model: UpdateTaskModelType };



