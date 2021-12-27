const initialState: AppInitialStateType = {
   status: 'idle',
   error: null
}
export const appReducer = (state = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type){
        case "APP/SET-ERROR":
            return {...state, error: action.error};
        case "APP/SET-STATUS":
            return {...state, status: action.status};
        default:
            return state;
    }
}

//Action creators
export const setError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setStatus = (status: AppStatusType) => ({type: 'APP/SET-STATUS', status} as const);

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: AppStatusType
    error: string | null
}
export type ActionsType = ReturnType<typeof setError> | ReturnType<typeof setStatus>