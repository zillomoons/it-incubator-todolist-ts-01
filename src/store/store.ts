import {combineReducers, createStore, applyMiddleware} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import thunkMiddleware from 'redux-thunk';

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// export type AppDispatch = typeof  store.dispatch;