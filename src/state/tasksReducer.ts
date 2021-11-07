import {v1} from "uuid";
import {AddNewTodoAC, RemoveTodoListAC} from "./todoListReducer";
import {TaskType} from "../Todolist";

export type TaskStateType = { [key: string]: TaskType[] }
type ActionsType = ReturnType<typeof RemoveTaskAC> | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof EditTaskTitleAC> | ReturnType<typeof ChangeTaskStatusAC>
    | ReturnType<typeof AddNewTodoAC> | ReturnType<typeof RemoveTodoListAC>

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todoID]: state[action.todoID]
                    .filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todoID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoID]]
            }
        case "EDIT-TASK-TITLE":
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, title: action.title} : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone} : t)
            }
        case "ADD-NEW-TODO":
            return {...state, [action.todoID] : []}
        case "REMOVE-TODOLIST":
            let stateCopy = {...state};
            delete stateCopy[action.todoID];
            return stateCopy;
        default:
            return state;
    }
}

export const RemoveTaskAC = (todoID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todoID, taskID} as const;
}
export const AddTaskAC = (todoID: string, title: string) => {
    return {type: 'ADD-TASK', todoID, title} as const;
}
export const EditTaskTitleAC = (todoID: string, taskID: string, title: string) => {
    return {type: 'EDIT-TASK-TITLE', todoID, taskID, title} as const;
}
export const ChangeTaskStatusAC = (todoID: string, taskID: string, isDone: boolean ) => {
    return {type: 'CHANGE-TASK-STATUS', todoID, taskID, isDone} as const;
}