import {Dispatch} from "redux";
import {setAppError} from "../state/app-reducer/app-reducer";
import {ResponseType} from '../api/todolists-api'


export function handleServerAppError<T>(dispatch: Dispatch, data: ResponseType<T>) {
    const message = data.messages.length > 0 ? data.messages[0] : 'Something went wrong';
    dispatch(setAppError({error: message}));
}


// generic function example means that you receive param with type T and function return value with type T
// T can be anything: string, number, boolean, string[], etc.
// function f5<T> (a:T): T {
//     return a;
// }
