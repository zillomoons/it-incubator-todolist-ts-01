import {RequestStatusType, setAppError, setAppStatus} from "./app-reducer";
import {appReducer} from "./index";

let startState: AppInitialStateType;
beforeEach(()=>{
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})
test('app reducer should set error', ()=> {

    const endState = appReducer(startState, setAppError({error: 'some error'}))
    expect(endState.error).not.toBe(null);
})

test('app reducer should set correct status', ()=> {
    const endState = appReducer(startState, setAppStatus({status:'loading'}));

    expect(endState.status).toBe('loading')
})
// test('app reducer should change isInitialized', ()=>{
//     const endState = appReducer(startState, initializeApp.fulfilled(undefined));

//     expect(endState.isInitialized).toBe(true)
// })
type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
