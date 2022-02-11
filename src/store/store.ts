import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todoLists-reducer/todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from "../state/app-reducer/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../state/auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {FieldErrorType} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
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
