import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppError} from "../app-reducer/app-reducer";

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ActionsType): AuthInitStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//Action Creators
export const setIsLoggedIn = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const);

//Thunk Creators
export const login = (loginParams: LoginParamsType) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);
    try {
        const {data} = await authAPI.login(loginParams);
        if (data.resultCode === ResultCodes.success) {
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerAppError(dispatch, data)
        }
    } catch (e: any) {
        dispatch(setAppError(e.message));
    } finally {
        preloaderControl('idle', dispatch)
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);
    try {
        const {data} = await authAPI.logout();
        data.resultCode === ResultCodes.success
            ? dispatch(setIsLoggedIn(false))
            : handleServerAppError(dispatch, data)
    } catch (e: any) {
        dispatch(setAppError(e.message));
    } finally {
        preloaderControl('idle', dispatch)
    }
}

//Types
export type AuthInitStateType = typeof initialState;
type ActionsType = ReturnType<typeof setIsLoggedIn>