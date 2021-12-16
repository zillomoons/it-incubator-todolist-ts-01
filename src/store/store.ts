import {combineReducers, createStore, applyMiddleware} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todoListReducer} from "../state/todoListReducer";
import thunkMiddleware from 'redux-thunk';

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof  store.dispatch;