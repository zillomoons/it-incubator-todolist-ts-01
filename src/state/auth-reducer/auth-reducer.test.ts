import {authActions, authReducer} from "./index";

type AuthInitStateType = { isLoggedIn: boolean };

let startState: AuthInitStateType;
beforeEach(()=>{
    startState = {
        isLoggedIn: false

    }
})
test('auth reducer should change isLoggedIn', ()=>{
    const {setIsLoggedIn} = authActions;
    const endState = authReducer(startState, setIsLoggedIn({value:true}));

    expect(endState.isLoggedIn).toBe(true)
})

