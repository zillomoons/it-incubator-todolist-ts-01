import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authAPI} from "../../api/todolists-api";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {preloaderControl} from "../../utils/preloaderControl";
import {handleAsyncNetworkError} from "../../utils/error-utils";
import {appActions} from "./app-common-actions";
import {authActions} from "../auth-reducer";

const {setIsLoggedIn} = authActions;
//Thunk creators
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (param, thunkAPI) => {
        preloaderControl('loading', thunkAPI.dispatch);
        try {
            const {data} = await authAPI.me();
            if (data.resultCode === ResultCodes.success) {
                thunkAPI.dispatch(setIsLoggedIn({value: true}))
            }

        } catch (e: any) {
            return handleAsyncNetworkError(e, thunkAPI)

        } finally {
            preloaderControl('idle', thunkAPI.dispatch)
        }
    })

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true;
            })
            .addCase(appActions.setAppStatus, (state, action)=> {
                state.status = action.payload.status;
            })
            .addCase(appActions.setAppError, (state, action)=> {
                state.error = action.payload.error;
            })
    }
});

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


