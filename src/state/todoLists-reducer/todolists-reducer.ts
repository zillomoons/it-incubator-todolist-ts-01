import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {ACTIONS_TYPE} from "../actions";
import {Dispatch} from "redux";
import {RequestStatusType, setAppError} from "../app-reducer/app-reducer";
import {ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {preloaderControl} from "../../utils/preloaderControl";

const initialState: TodolistEntityType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistEntityType[] => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todoID)
        case ACTIONS_TYPE.EDIT_TODOLIST:
            return state.map(todo => todo.id === action.todoID
                ? {...todo, title: action.title} : todo)
        case ACTIONS_TYPE.ADD_TODOLIST:
            return [{...action.todo, filter: 'all', entityStatus: 'idle'}, ...state]
        case ACTIONS_TYPE.CHANGE_FILTER:
            return state.map(todo => todo.id === action.todoID
                ? {...todo, filter: action.value} : todo);
        case ACTIONS_TYPE.SET_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}));
        case ACTIONS_TYPE.CHANGE_ENTITY_STATUS:
            return state.map(todo => todo.id === action.todoID ? {...todo, entityStatus: action.status} : todo)
        default:
            return state;
    }
}

// Action creators
export const removeTodoListAC = (todoID: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID} as const)
export const editTodoTitleAC = (todoID: string, title: string) => ({
    type: ACTIONS_TYPE.EDIT_TODOLIST, todoID, title
} as const)
export const addNewTodoAC = (todo: TodolistType) => ({type: ACTIONS_TYPE.ADD_TODOLIST, todo} as const)
export const changeFilterAC = (todoID: string, value: FilterValuesType,) => ({
    type: ACTIONS_TYPE.CHANGE_FILTER, todoID, value
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: ACTIONS_TYPE.SET_TODOLISTS, todolists} as const)
export const changeEntityStatus = (todoID: string, status: RequestStatusType) => ({
    type: ACTIONS_TYPE.CHANGE_ENTITY_STATUS, status, todoID
} as const)

// Thunk creators
export const getTodolists = () => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);

    try {
        const {data} = await todolistsAPI.getTodolists();
        dispatch(setTodolistsAC(data));
    } catch (error: any) {
        dispatch(setAppError(error.message));
    } finally {
        preloaderControl('idle', dispatch);
    }

}
export const createTodolist = (title: string) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);
    try {
        const {data} = await todolistsAPI.createTodolist(title);
        data.resultCode === ResultCodes.success
            ? dispatch(addNewTodoAC(data.data.item))
            : handleServerAppError(dispatch, data);
    } catch (error: any) {
        dispatch(setAppError(error.message));
    } finally {
        preloaderControl('idle', dispatch);
    }

}
export const deleteTodolist = (todoID: string) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch, todoID);
    try {
        const {data} = await todolistsAPI.deleteTodolist(todoID);
        data.resultCode === ResultCodes.success && dispatch(removeTodoListAC(todoID));
    } catch (error: any) {
        dispatch(setAppError(error.message));
    } finally {
        preloaderControl('idle', dispatch, todoID)
    }
}
export const updateTodoTitle = (todoID: string, title: string) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch);
    try {
        const {data} = await todolistsAPI.updateTodolist(todoID, title);
        data.resultCode === ResultCodes.success && dispatch(editTodoTitleAC(todoID, title));
    } catch (error: any) {
        dispatch(setAppError(error.message));
    } finally {
        preloaderControl('idle', dispatch);
    }
}

//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ActionsType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof editTodoTitleAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeEntityStatus>