import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasksReducer";
import {todoListReducer} from "../state/todoListReducer";

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);