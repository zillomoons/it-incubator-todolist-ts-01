import {AppInitialStateType, appReducer, setError, setStatus} from "./app-reducer";

let startState: AppInitialStateType;
beforeEach(()=>{
    startState = {
        status: "idle",
        error: null
    }
})
test('app reducer should set error', ()=> {

    const endState = appReducer(startState, setError('some error'))
    expect(endState.error).not.toBe(null);
})

test('app reducer should set correct status', ()=> {
    const endState = appReducer(startState, setStatus('loading'));

    expect(endState.status).toBe('loading')
})