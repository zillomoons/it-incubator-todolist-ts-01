import {AppInitialStateType, appReducer, setAppError, setAppStatus, setIsInitialized} from "./app-reducer";

let startState: AppInitialStateType;
beforeEach(()=>{
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})
test('app reducer should set error', ()=> {

    const endState = appReducer(startState, setAppError('some error'))
    expect(endState.error).not.toBe(null);
})

test('app reducer should set correct status', ()=> {
    const endState = appReducer(startState, setAppStatus('loading'));

    expect(endState.status).toBe('loading')
})
test('app reducer should change isInitialized', ()=>{
    const endState = appReducer(startState, setIsInitialized(true));

    expect(endState.isInitialized).toBe(true)
})