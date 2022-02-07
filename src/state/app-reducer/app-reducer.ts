import {authAPI} from "../../api/todolists-api";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {setIsLoggedIn} from "../auth-reducer/auth-reducer";
import {preloaderControl} from "../../utils/preloaderControl";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//Thunk creators
export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (param, {dispatch}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await authAPI.me();
            if (data.resultCode === ResultCodes.success) {
                dispatch(setIsLoggedIn({value: true}))
            }

        } catch (e: any) {
            setAppError({error: e.message});
        } finally {
            preloaderControl('idle', dispatch)
        }
    }
)

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true;
            })
    }
})
export const appReducer = slice.reducer;
//Action creators
export const {setAppError, setAppStatus} = slice.actions;


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


