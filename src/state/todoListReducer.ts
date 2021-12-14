import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export const todoListId_1 = v1();
export const todoListId_2 = v1();

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistEntityType[] = []
type ActionsType = ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof EditTodoTitleAC>
    | ReturnType<typeof AddNewTodoAC>
    | ReturnType<typeof ChangeFilterAC>

export const todoListReducer = (state = initialState, action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todo => todo.id !== action.todoID)
        case "EDIT-TODO-TITLE":
            return state.map(todo => todo.id === action.todoID
                ? {...todo, title: action.title} : todo)
        case "ADD-NEW-TODO":
            return [{
                id: action.todoID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case "CHANGE-FILTER":
            return state.map(todo => todo.id === action.todoID
                ? {...todo, filter: action.value} : todo)
        default:
            return state;
    }
}

export const RemoveTodoListAC = (todoID: string) => {
    return {type: 'REMOVE-TODOLIST', todoID} as const;
}
export const EditTodoTitleAC = (todoID: string, title: string) => {
    return {type: 'EDIT-TODO-TITLE', todoID, title} as const;
}
export const AddNewTodoAC = (title: string) => {
    return {type: 'ADD-NEW-TODO', todoID: v1(), title} as const;
}
export const ChangeFilterAC = (todoID: string, value: FilterValuesType,) => {
    return {type: 'CHANGE-FILTER', todoID, value} as const;
}