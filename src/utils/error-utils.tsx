import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../state/app-reducer/app-reducer";
import {ResponseType} from '../api/todolists-api'
import {AxiosError} from "axios";


export function handleServerAppError<T>(dispatch: Dispatch, data: ResponseType<T>) {
    const message = data.messages.length > 0 ? data.messages[0] : 'Something went wrong';
    dispatch(setAppError({error: message}));
}
type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export function handleAsyncServerAppError <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType, showError = true) {
    if (showError){
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}
export function handleAsyncNetworkError(error: AxiosError, thunkAPI: ThunkAPIType, showError = true){
    if (showError){
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}

// generic function example means that you receive param with type T and function return value with type T
// T can be anything: string, number, boolean, string[], etc.
// function f5<T> (a:T): T {
//     return a;
// }
