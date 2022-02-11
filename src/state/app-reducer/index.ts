import {initializeApp, slice} from './app-reducer';

const appReducer = slice.reducer;
const appActions = {
    ...slice.actions,
    initializeApp,
}
export {
    appActions,
    appReducer
}
