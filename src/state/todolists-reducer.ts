import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {ACTIONS_TYPE} from "./actions";
import {Dispatch} from "redux";

const initialState: TodolistEntityType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todoID)
        case ACTIONS_TYPE.EDIT_TODOLIST:
            return state.map(todo => todo.id === action.todoID
                ? {...todo, title: action.title} : todo)
        case ACTIONS_TYPE.ADD_TODOLIST:
            return [{...action.todo, filter: 'all'}, ...state]
        case ACTIONS_TYPE.CHANGE_FILTER:
            return state.map(todo => todo.id === action.todoID
                ? {...todo, filter: action.value} : todo);
        case ACTIONS_TYPE.SET_TODOLISTS:
            return action.todolists.map(todo=> ({...todo, filter : 'all' as FilterValuesType}) )
        default:
            return state;
    }
}

// Action creators
export const removeTodoListAC = (todoID: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID} as const)
export const editTodoTitleAC = (todoID: string, title: string) => ({type: ACTIONS_TYPE.EDIT_TODOLIST, todoID, title} as const)
export const addNewTodoAC = (todo: TodolistType) => ({type: ACTIONS_TYPE.ADD_TODOLIST, todo} as const)
export const changeFilterAC = (todoID: string, value: FilterValuesType,) => ({type: ACTIONS_TYPE.CHANGE_FILTER, todoID, value} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: ACTIONS_TYPE.SET_TODOLISTS, todolists} as const)

// Thunk creators
export const getTodolists = () => async (dispatch: Dispatch<ActionsType>) => {
    const { data } = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(data));
}
export const createTodolist = (title: string) => async (dispatch: Dispatch<ActionsType>) => {
    const { data } = await todolistsAPI.createTodolist(title);
    if (data.resultCode === 0){
        dispatch(addNewTodoAC(data.data.item));
    }
}
export const deleteTodolist = (todoID: string) => async (dispatch: Dispatch<ActionsType>) => {
    const { data } = await todolistsAPI.deleteTodolist(todoID);
    if (data.resultCode === 0){
        dispatch(removeTodoListAC(todoID));
    }
}
export const updateTodoTitle = (todoID: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    const { data } = await todolistsAPI.updateTodolist(todoID, title);
    if (data.resultCode === 0){
        dispatch(editTodoTitleAC(todoID, title));
    }
}

//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
}
type ActionsType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof editTodoTitleAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>