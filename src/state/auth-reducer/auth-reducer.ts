import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppError} from "../app-reducer/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//RTK asyncThunks
export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: string[]; fieldsErrors?: FieldErrorType[] } }>(
        'auth/login', async (param, thunkAPI) => {
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

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
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


//Types
//типизация не нужна, она создается автоматически библиотекой
// export type AuthInitStateType = typeof initialState;
// type ActionsType = ReturnType<typeof setIsLoggedIn>
// boilerplate of reducer and action creators is reduced thanks to slice
// const authReducer = (state = initialState, action: ActionsType): AuthInitStateType => {
//     switch (action.type) {
//         case "AUTH/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
//Action Creators
// export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const);

// interface SerializedError {
//     name?: string
//     message?: string
//     code?: string
//     stack?: string
// }
//
// interface PendingAction<ThunkArg> {
//     type: string
//     payload: undefined
//     meta: {
//         requestId: string
//         arg: ThunkArg
//     }
// }
//
// interface FulfilledAction<ThunkArg, PromiseResult> {
//     type: string
//     payload: PromiseResult
//     meta: {
//         requestId: string
//         arg: ThunkArg
//     }
// }
//
// interface RejectedAction<ThunkArg> {
//     type: string
//     payload: undefined
//     error: SerializedError | any
//     meta: {
//         requestId: string
//         arg: ThunkArg
//         aborted: boolean
//         condition: boolean
//     }
// }
//
// interface RejectedWithValueAction<ThunkArg, RejectedValue> {
//     type: string
//     payload: RejectedValue
//     error: { message: 'Rejected' }
//     meta: {
//         requestId: string
//         arg: ThunkArg
//         aborted: boolean
//     }
// }
//
// type Pending = <ThunkArg>(
//     requestId: string,
//     arg: ThunkArg
// ) => PendingAction<ThunkArg>
//
// type Fulfilled = <ThunkArg, PromiseResult>(
//     payload: PromiseResult,
//     requestId: string,
//     arg: ThunkArg
// ) => FulfilledAction<ThunkArg, PromiseResult>
//
// type Rejected = <ThunkArg>(
//     requestId: string,
//     arg: ThunkArg
// ) => RejectedAction<ThunkArg>
//
// type RejectedWithValue = <ThunkArg, RejectedValue>(
//     requestId: string,
//     arg: ThunkArg
// ) => RejectedWithValueAction<ThunkArg, RejectedValue>
