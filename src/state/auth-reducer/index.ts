import {asyncActions, slice} from "./auth-reducer";

const authActions = {...asyncActions};
const authReducer = slice.reducer;
export {
    authActions,
    authReducer
}
