import {asyncActions as tasksAsyncActions, slice} from './tasks-reducer';

const tasksReducer = slice.reducer;
const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
};

export {
    tasksActions,
    tasksReducer
}
