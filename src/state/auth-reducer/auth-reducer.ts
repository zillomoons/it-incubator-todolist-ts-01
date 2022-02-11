import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppError} from "../app-reducer/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
                handleServerAppError(thunkAPI.dispatch, data)
                return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
            }
        } catch (e: any) {
            thunkAPI.dispatch(setAppError({error: e.message}));
            return thunkAPI.rejectWithValue({errors: [e.message], fieldsErrors: undefined})
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
                handleServerAppError(thunkAPI.dispatch, data);
                return thunkAPI.rejectWithValue({});
            }
        } catch (e: any) {
            thunkAPI.dispatch(setAppError({error: e.message}));
            return thunkAPI.rejectWithValue({});
        } finally {
            preloaderControl('idle', thunkAPI.dispatch)
        }
    })

export const authActions = {login, logout}

const slice = createSlice({
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
})

export const authReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;


