import {v1} from "uuid";
import {AddNewTodoAC, RemoveTodoListAC} from "./todoListReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

export type TaskStateType = { [key: string]: TaskType[] }

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof editTaskTitleAC> | ReturnType<typeof changeTaskStatusAC>
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
                [action.todoID]: [
                    {
                        id: v1(),
                        title: action.title,
                        description: '',
                        status: TaskStatuses.New,
                        priority: TaskPriorities.Low,
                        startDate: '',
                        deadline: '',
                        todoListId: action.todoID,
                        order: 0,
                        addedDate: ''
                    }, ...state[action.todoID]]
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
                    ? {...t, status: action.status} : t)
            }
        case "ADD-NEW-TODO":
            return {...state, [action.todoID]: []}
        case "REMOVE-TODOLIST":
            let stateCopy = {...state};
            delete stateCopy[action.todoID];
            return stateCopy;
        default:
            return state;
    }
}

export const removeTaskAC = (todoID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todoID, taskID} as const;
}
export const addTaskAC = (todoID: string, title: string) => {
    return {type: 'ADD-TASK', todoID, title} as const;
}
export const editTaskTitleAC = (todoID: string, taskID: string, title: string) => {
    return {type: 'EDIT-TASK-TITLE', todoID, taskID, title} as const;
}
export const changeTaskStatusAC = (todoID: string, taskID: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todoID, taskID, status} as const;
}