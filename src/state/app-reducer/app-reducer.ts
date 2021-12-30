import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {setIsLoggedIn} from "../auth-reducer/auth-reducer";
import {preloaderControl} from "../../utils/preloaderControl";

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
export const appReducer = (state = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.error};
        case "APP/SET-STATUS":
            return {...state, status: action.status};
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state;
    }
}

//Action creators
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setIsInitialized = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const);

//Thunk creators
export const initializeApp = () => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);
    try {
        const {data} = await authAPI.me();
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedIn(true))
        }
        // else {
        //     handleServerAppError(dispatch, data)
        // }
    } catch (e: any) {
        setAppError(e.message);
    } finally {
        preloaderControl('idle', dispatch)
        dispatch(setIsInitialized(true))
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type ActionsType = ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setIsInitialized>