import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppDispatch} from "../store/store";
import {ACTIONS_TYPE} from "./actions";

export const todoListId_1 = v1();
export const todoListId_2 = v1();

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistEntityType[] = []
type ActionsType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof editTodoTitleAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>

export const todoListReducer = (state = initialState, action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todoID)
        case ACTIONS_TYPE.EDIT_TODOLIST:
            return state.map(todo => todo.id === action.todoID
                ? {...todo, title: action.title} : todo)
        case ACTIONS_TYPE.ADD_NEW_TODOLIST:
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
export const removeTodoListAC = (todoID: string) => {
    return {type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID} as const;
}
export const editTodoTitleAC = (todoID: string, title: string) => {
    return {type: ACTIONS_TYPE.EDIT_TODOLIST, todoID, title} as const;
}
export const addNewTodoAC = (todo: TodolistType) => {
    return {type: ACTIONS_TYPE.ADD_NEW_TODOLIST, todo} as const;
}
export const changeFilterAC = (todoID: string, value: FilterValuesType,) => {
    return {type: ACTIONS_TYPE.CHANGE_FILTER, todoID, value} as const;
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: ACTIONS_TYPE.SET_TODOLISTS, todolists} as const;
}

// Thunk creators
export const getTodolists = () => async (dispatch: AppDispatch) => {
    const { data } = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(data));
}
export const createTodolist = (title: string) => async (dispatch: AppDispatch) => {
    const { data } = await todolistsAPI.createTodolist(title);
    if (data.resultCode === 0){
        dispatch(addNewTodoAC(data.data.item));
    }
}
export const deleteTodolist = (todoID: string) => async (dispatch: AppDispatch) => {
    const { data } = await todolistsAPI.deleteTodolist(todoID);
    if (data.resultCode === 0){
        dispatch(removeTodoListAC(todoID));
    }
}
export const updateTodoTitle = (todoID: string, title: string) => async (dispatch: AppDispatch) => {
    const { data } = await todolistsAPI.updateTodolist(todoID, title);
    if (data.resultCode === 0){
        dispatch(editTodoTitleAC(todoID, title));
    }
}