import {combineReducers, AnyAction, bindActionCreators, ActionCreatorsMapObject} from "redux";
import {tasksReducer} from "../state/tasks-reducer/tasks-reducer";
import {todolistsReducer} from "../state/todoLists-reducer/todolists-reducer";
import thunkMiddleware, { ThunkDispatch} from 'redux-thunk';
import {appReducer} from "../state/app-reducer/app-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../state/auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
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

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export function useActions<T extends ActionCreatorsMapObject>(actions: T){
    const dispatch = useAppDispatch();

    return useMemo(()=>{
         return bindActionCreators(actions, dispatch);
    }, [])
}
//Types
export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<void, AppRootStateType, AnyAction>;
export type AppDispatchType = typeof store.dispatch;
export type ThunkErrorType = { rejectValue: {errors: string[]; fieldsErrors?: FieldErrorType[]}};
