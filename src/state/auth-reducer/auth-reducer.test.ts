import {authReducer, setIsLoggedIn} from "./auth-reducer";

type AuthInitStateType = { isLoggedIn: boolean };

let startState: AuthInitStateType;
beforeEach(()=>{
    startState = {
        isLoggedIn: false

    }
})
test('auth reducer should change isLoggedIn', ()=>{
    const endState = authReducer(startState, setIsLoggedIn({value:true}));

    expect(endState.isLoggedIn).toBe(true)
})

