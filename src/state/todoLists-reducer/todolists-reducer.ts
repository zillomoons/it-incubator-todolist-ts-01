import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../app-reducer/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTodolist, deleteTodolist, getTodolists, updateTodoTitle} from "./todolists-actions";


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
export const {changeFilterAC, changeEntityStatus} = slice.actions;

//Types
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistEntityType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

