import {asyncActions as tasksAsyncActions, slice} from './tasks-reducer';

export const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
};
