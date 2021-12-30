import {combineReducers, createStore, applyMiddleware, AnyAction} from "redux";
import {tasksReducer} from "../state/tasks-reducer/tasks-reducer";
import {todolistsReducer} from "../state/todoLists-reducer/todolists-reducer";
import thunkMiddleware, { ThunkDispatch} from 'redux-thunk';
import {appReducer} from "../state/app-reducer/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../state/auth-reducer/auth-reducer";

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
// export type AppDispatch = typeof  store.dispatch;

export type AppThunkDispatch = ThunkDispatch<void, AppRootStateType, AnyAction>