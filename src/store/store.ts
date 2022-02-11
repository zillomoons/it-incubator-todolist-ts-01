import {AnyAction, combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from "react-redux";

import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todoLists-reducer";
import {appReducer} from "../state/app-reducer";
import {authReducer} from "../state/auth-reducer";
import {FieldErrorType} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//Types
export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<void, AppRootStateType, AnyAction>;
export type AppDispatchType = typeof store.dispatch;
export type ThunkErrorType = { rejectValue: {errors: string[]; fieldsErrors?: FieldErrorType[]}};
