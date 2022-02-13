import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleAsyncNetworkError, handleAsyncServerAppError,} from "../../utils/error-utils";
import {ThunkErrorType} from "../../store/store";

//RTK asyncThunks
export const login = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>(
    'auth/login',
    async (param, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch);
        try {
            const {data} = await authAPI.login(param);
            if (data.resultCode === ResultCodes.success) {
                return;
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (e: any) {
            return handleAsyncNetworkError(e, thunkAPI)
        } finally {
            preloaderControl('idle', thunkAPI.dispatch)
        }
    })

export const logout = createAsyncThunk(
    'auth/logout',
    async (param, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch);
        try {
            const {data} = await authAPI.logout();
            if (data.resultCode === ResultCodes.success) {
                return;
            } else {
                return handleAsyncServerAppError(data, thunkAPI);
            }
        } catch (e: any) {
            return handleAsyncNetworkError(e, thunkAPI);
        } finally {
            preloaderControl('idle', thunkAPI.dispatch)
        }
    })

export const asyncActions = {login, logout}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
            })

    }
});


