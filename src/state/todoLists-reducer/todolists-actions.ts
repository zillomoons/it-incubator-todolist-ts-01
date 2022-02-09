// Thunk creators
import {createAsyncThunk} from "@reduxjs/toolkit";
import {preloaderControl} from "../../utils/preloaderControl";
import {todolistsAPI} from "../../api/todolists-api";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppError} from "../app-reducer/app-reducer";
import {getTasks} from "../tasks-reducer/tasks-actions";

export const getTodolists = createAsyncThunk(
    'todolists/getTodolists',
    async (param, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.getTodolists();
            //getting tasks for each todolist
            data.forEach(tl => {
                dispatch(getTasks(tl.id))
            })
            return {todolists: data};

        } catch (error: any) {
            dispatch(setAppError({error: error.message}))
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch)
        }
    })
export const createTodolist = createAsyncThunk(
    'todolists/createTodolist',
    async (title: string, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.createTodolist(title);
            if (data.resultCode === ResultCodes.success) {
                return {tl: data.data.item};
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch);
        }

    })
export const deleteTodolist = createAsyncThunk(
    'todolists/deleteTodolist',
    async (todoID: string, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch, todoID);
        try {
            const {data} = await todolistsAPI.deleteTodolist(todoID);
            if (data.resultCode === ResultCodes.success) {
                return {todoID};
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch, todoID)
        }
    })
export const updateTodoTitle = createAsyncThunk(
    'todolists, updateTodolist',
    async (param: { todoID: string, title: string }, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.updateTodolist(param.todoID, param.title);
            if (data.resultCode === ResultCodes.success) {
                return {todoID: param.todoID, title: param.title}
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch);
        }
    })
