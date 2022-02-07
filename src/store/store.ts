import {combineReducers, AnyAction} from "redux";
import {tasksReducer} from "../state/tasks-reducer/tasks-reducer";
import {todolistsReducer} from "../state/todoLists-reducer/todolists-reducer";
import thunkMiddleware, { ThunkDispatch} from 'redux-thunk';
import {appReducer} from "../state/app-reducer/app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../state/auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
export type RootReducerType = typeof rootReducer;
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppThunkDispatch = ThunkDispatch<void, AppRootStateType, AnyAction>;

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
