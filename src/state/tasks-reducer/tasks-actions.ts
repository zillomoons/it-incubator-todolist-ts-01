// RTK thunks which automatically create action creators to indicate successful API call (network request)
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppError, setAppStatus} from "../app-reducer/app-reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {handleServerAppError} from "../../utils/error-utils";
import {AppRootStateType} from "../../store/store";
import {ResultCodes} from "./tasks-reducer";

export const getTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (todoID: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await todolistsAPI.getTasks(todoID);
            return {todoID, tasks: data.items};
        } catch (error: any) {
            thunkAPI.dispatch(setAppError({error: error.message}));
            return thunkAPI.rejectWithValue(error.message)
        } finally {
            thunkAPI.dispatch(setAppStatus({status: 'idle'}))
        }
    })
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (param: { todoID: string, taskID: string }, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch, param.todoID, param.taskID);

        try {
            const {data} = await todolistsAPI.deleteTask(param);
            if (data.resultCode === ResultCodes.success) {
                return {todoID: param.todoID, taskID: param.taskID};
            } else {
                handleServerAppError(thunkAPI.dispatch, data);
                //should be replaced with more suitable action.payload
                return thunkAPI.rejectWithValue('some error')
            }
        } catch (error: any) {
            thunkAPI.dispatch(setAppError({error: error.message}));
            return thunkAPI.rejectWithValue(error.message)
        } finally {
            preloaderControl('idle', thunkAPI.dispatch, param.todoID, param.taskID)
        }
    })
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (param: { todoID: string, title: string }, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch, param.todoID);

        try {
            const {data} = await todolistsAPI.createTask(param.todoID, param.title)
            if (data.resultCode === ResultCodes.success) {
                return {task: data.data.item};
            } else {
                handleServerAppError(dispatch, data);
                //should be replaced with more suitable action.payload
                return rejectWithValue(null)
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null)
        } finally {
            preloaderControl('idle', dispatch, param.todoID);
        }
    })
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (param: { todoID: string, taskID: string, model: UpdateTaskModelType }, {
        dispatch,
        rejectWithValue,
        getState
    }) => {
        preloaderControl('loading', dispatch, param.todoID, param.taskID);
        const state = getState() as AppRootStateType;
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
                    handleServerAppError(dispatch, data);
                    //should be replaced with more suitable action.payload
                    return rejectWithValue(null);
                }
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null)

        } finally {
            preloaderControl('idle', dispatch, param.todoID, param.taskID)
        }
    })
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
