import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppError} from "../app-reducer/app-reducer";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes, asyncActions as todolistsAsyncActions} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {ThunkErrorType} from "../../store/store";


const getTodolists = createAsyncThunk(
    'todolists/getTodolists',
    async (param, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.getTodolists();
            //getting tasks for each todolist
            data.forEach(tl => {
                dispatch(todolistsAsyncActions.getTasks(tl.id))
            })
            return {todolists: data};

        } catch (error: any) {
            dispatch(setAppError({error: error.message}))
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch)
        }
    })
const createTodolist = createAsyncThunk<TodolistType, string, ThunkErrorType >(
    'todolists/createTodolist',
    async (title, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.createTodolist(title);
            if (data.resultCode === ResultCodes.success) {
                return data.data.item;
            } else {
                // handleServerAppError(dispatch, data);
                return rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors});
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined});
        } finally {
            preloaderControl('idle', dispatch);
        }

    })
const deleteTodolist = createAsyncThunk(
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
const updateTodoTitle = createAsyncThunk(
    'todolists, updateTodolist',
    async (param: { todoID: string, title: string }, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch, param.todoID);
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
            preloaderControl('idle', dispatch, param.todoID);
        }
    })

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
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoID);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(updateTodoTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoID);
                if (index > -1) state[index].title = action.payload.title;
            })
    }
})

// export const todolistsReducer = slice.reducer;
//Action creators
export const {changeFilter, changeEntityStatus} = slice.actions;

//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

