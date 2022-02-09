import {initializeApp, slice} from './app-reducer';

export const appActions = {
    ...slice.actions,
    initializeApp,
}
