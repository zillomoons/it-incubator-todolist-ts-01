import {asyncActions as todolistsAsyncActions, slice} from "./todolists-reducer";

const todolistsReducer = slice.reducer;
const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    todolistsActions,
    todolistsReducer
};
