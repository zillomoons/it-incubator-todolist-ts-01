import {AuthInitStateType, authReducer, setIsLoggedIn} from "./auth-reducer";

let startState: AuthInitStateType;
beforeEach(()=>{
    startState = {
        isLoggedIn: false

    }
})
test('auth reducer should change isLoggedIn', ()=>{
    const endState = authReducer(startState, setIsLoggedIn(true));

    expect(endState.isLoggedIn).toBe(true)
})

