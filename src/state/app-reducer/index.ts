import {initializeApp, slice} from './app-reducer';

const appReducer = slice.reducer;
const appAsyncAction = {
    initializeApp
}
export {
    appAsyncAction,
    appReducer
}
