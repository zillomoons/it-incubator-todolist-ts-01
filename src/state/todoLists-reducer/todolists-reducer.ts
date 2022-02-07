import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppError} from "../app-reducer/app-reducer";
import {getTasks, ResultCodes} from "../tasks-reducer/tasks-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {preloaderControl} from "../../utils/preloaderControl";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


// Thunk creators
export const getTodolists = createAsyncThunk(
    'todolists/getTodolists',
    async (param, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.getTodolists();
            //getting tasks for each todolist
            data.forEach(tl => {
                dispatch(getTasks(tl.id))
            })
            return {todolists: data};

        } catch (error: any) {
            dispatch(setAppError({error: error.message}))
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch)
        }
    }
)
export const createTodolist = createAsyncThunk(
    'todolists/createTodolist',
    async (title: string, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.createTodolist(title);
            if (data.resultCode === ResultCodes.success) {
                return {tl: data.data.item};
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch);
        }

    }
)

export const deleteTodolist = createAsyncThunk(
    'todolists/deleteTodolist',
    async (todoID: string, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch, todoID);
        try {
            const {data} = await todolistsAPI.deleteTodolist(todoID);
            if (data.resultCode === ResultCodes.success) {
                return {todoID};
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch, todoID)
        }
    }
)

export const updateTodoTitle = createAsyncThunk(
    'todolists, updateTodolist',
    async (param: { todoID: string, title: string }, {dispatch, rejectWithValue}) => {
        preloaderControl('loading', dispatch);
        try {
            const {data} = await todolistsAPI.updateTodolist(param.todoID, param.title);
            if (data.resultCode === ResultCodes.success){
                return {todoID: param.todoID, title: param.title}
            } else {
                handleServerAppError(dispatch, data);
                return rejectWithValue(null);
            }
        } catch (error: any) {
            dispatch(setAppError({error: error.message}));
            return rejectWithValue(null);
        } finally {
            preloaderControl('idle', dispatch);
        }
    }
)



const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistEntityType[],
    reducers: {
        changeFilterAC(state, action: PayloadAction<{ todoID: string, value: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoID);
            if (index > -1) state[index].filter = action.payload.value;
        },
        changeEntityStatus(state, action: PayloadAction<{ todoID: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoID);
            if (index > -1) state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.tl, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoID);
                if (index > -1) state.splice(index, 1);
            })
            .addCase(updateTodoTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoID);
                if (index > -1) state[index].title = action.payload.title;
            })
    }
})

export const todolistsReducer = slice.reducer;
//Action creators
export const {
    changeFilterAC,
    changeEntityStatus
} = slice.actions;


//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//     (state = initialState, action: ActionsType): TodolistEntityType[] => {
//     switch (action.type) {
//         case ACTIONS_TYPE.REMOVE_TODOLIST:
//             return state.filter(tl => tl.id !== action.todoID)
//         case ACTIONS_TYPE.EDIT_TODOLIST:
//             return state.map(tl => tl.id === action.todoID
//                 ? {...tl, title: action.title} : tl)
//         case ACTIONS_TYPE.ADD_TODOLIST:
//             return [{...action.tl, filter: 'all', entityStatus: 'idle'}, ...state]
//         case ACTIONS_TYPE.CHANGE_FILTER:
//             return state.map(tl => tl.id === action.todoID
//                 ? {...tl, filter: action.value} : tl);
//         case ACTIONS_TYPE.SET_TODOLISTS:
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
//         case ACTIONS_TYPE.CHANGE_ENTITY_STATUS:
//             return state.map(tl => tl.id === action.todoID ? {...tl, entityStatus: action.status} : tl)
//         default:
//             return state;
//     }
// }
// Action creators
// export const removeTodoListAC = (todoID: string) => ({type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID} as const)
// export const editTodoTitleAC = (todoID: string, title: string) => ({
//     type: ACTIONS_TYPE.EDIT_TODOLIST, todoID, title
// } as const)
// export const addNewTodoAC = (tl: TodolistType) => ({type: ACTIONS_TYPE.ADD_TODOLIST, tl} as const)
// export const changeFilterAC = (todoID: string, value: FilterValuesType,) => ({
//     type: ACTIONS_TYPE.CHANGE_FILTER, todoID, value
// } as const)
// export const setTodolistsAC = (todolists: TodolistType[]) => ({type: ACTIONS_TYPE.SET_TODOLISTS, todolists} as const)
// export const changeEntityStatus = (todoID: string, status: RequestStatusType) => ({
//     type: ACTIONS_TYPE.CHANGE_ENTITY_STATUS, status, todoID
// } as const)
