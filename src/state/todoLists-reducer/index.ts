import {asyncActions as todolistsAsyncActions, slice} from "./todolists-reducer";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {todolistsActions};
