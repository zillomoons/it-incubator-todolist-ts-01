import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../app-reducer/app-reducer";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes, asyncActions as todolistsAsyncActions} from "../tasks-reducer/tasks-reducer";
import {handleAsyncNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import {ThunkErrorType} from "../../store/store";


const getTodolists = createAsyncThunk<TodolistType[], void, ThunkErrorType>(
    'todolists/getTodolists',
    async (param, ThunkAPI) => {
        preloaderControl('loading', ThunkAPI.dispatch);
        try {
            const {data} = await todolistsAPI.getTodolists();
            //getting tasks for each todolist
            data.forEach(tl => {
                ThunkAPI.dispatch(todolistsAsyncActions.getTasks(tl.id))
            })
            return data;
        } catch (error: any) {
            return handleAsyncNetworkError(error, ThunkAPI);
        } finally {
            preloaderControl('idle', ThunkAPI.dispatch)
        }
    });
const createTodolist = createAsyncThunk<TodolistType, string, ThunkErrorType >(
    'todolists/createTodolist',
    async (title, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch);
        try {
            const {data} = await todolistsAPI.createTodolist(title);
            if (data.resultCode === ResultCodes.success) {
                return data.data.item;
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncNetworkError(error, thunkAPI)
        } finally {
            preloaderControl('idle', thunkAPI.dispatch);
        }

    });
const deleteTodolist = createAsyncThunk<string, string, ThunkErrorType>(
    'todolists/deleteTodolist',
    async (todoID, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch, todoID);
        try {
            const {data} = await todolistsAPI.deleteTodolist(todoID);
            if (data.resultCode === ResultCodes.success) {
                return todoID;
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncNetworkError(error, thunkAPI)
        } finally {
            preloaderControl('idle', thunkAPI.dispatch, todoID)
        }
    });
const updateTodoTitle = createAsyncThunk<{ todoID: string, title: string }, { todoID: string, title: string }, ThunkErrorType>(
    'todolists, updateTodolist',
    async (param, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch, param.todoID);
        try {
            const {data} = await todolistsAPI.updateTodolist(param.todoID, param.title);
            if (data.resultCode === ResultCodes.success) {
                return {todoID: param.todoID, title: param.title}
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncNetworkError(error, thunkAPI)
        } finally {
            preloaderControl('idle', thunkAPI.dispatch, param.todoID);
        }
    });

export const asyncActions = {
    getTodolists,
    createTodolist,
    deleteTodolist,
    updateTodoTitle
}

export const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistEntityType[],
    reducers: {
        changeFilter(state, action: PayloadAction<{ todoID: string, value: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoID);
            if (index > -1) state[index].filter = action.payload.value;
        },
        changeEntityStatus(state, action: PayloadAction<{ todoID: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoID);
            if (index > -1) state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(updateTodoTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoID);
                if (index > -1) state[index].title = action.payload.title;
            })
    }
});

export const todolistsReducer = slice.reducer;

//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

