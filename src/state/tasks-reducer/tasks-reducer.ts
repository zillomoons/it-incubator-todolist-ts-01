import {
    addNewTodoAC,
    removeTodoListAC,
    setTodolistsAC
} from "../todoLists-reducer/todolists-reducer";
import {AppRootStateType} from "../../store/store";
import {Dispatch} from "redux";
import {RequestStatusType, setAppError, setAppStatus} from "../app-reducer/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {TaskPriorities, TaskStatuses, todolistsAPI, TaskType} from "../../api/todolists-api";
import {preloaderControl} from "../../utils/preloaderControl";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//ResultCode statuses - indicates whether request to server was successful
export enum ResultCodes {
    success = 0,
    error = 1,
    captcha = 10
}

const initialState: TaskStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoID: string, taskID: string }>) {
            const tasks = state[action.payload.todoID];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index > -1) tasks.splice(index, 1);
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            const tlId = action.payload.task.todoListId;
            state[tlId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC(state, action: PayloadAction<{ todoID: string, taskID: string, model: UpdateTaskModelType }>) {
            const tlId = action.payload.todoID;
            const index = state[tlId].findIndex(t => t.id === action.payload.taskID);
            if (index > -1) state[tlId][index] = {...state[tlId][index], ...action.payload.model}
        },
        setTasksAC(state, action: PayloadAction<{ todoID: string, tasks: TaskType[] }>) {
            const tlId = action.payload.todoID;
            state[tlId] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}));
        },
        changeTaskEntityStatus(state, action: PayloadAction<{ todoID: string, taskID: string, status: RequestStatusType }>) {
            const tlId = action.payload.todoID;
            const index = state[tlId].findIndex(t => t.id === action.payload.taskID);
            if (index > -1) state[tlId][index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewTodoAC, (state, action) => {
                state[action.payload.todo.id] = [];
            })
            .addCase(removeTodoListAC, (state, action) => {
                 delete state[action.payload.todoID];
            })
            .addCase(setTodolistsAC, (state, action)=>{
                action.payload.todolists.forEach(tl=> state[tl.id] = []);
            })
    }
})

export const tasksReducer = slice.reducer;

//Action creators
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC,
    changeTaskEntityStatus,
} = slice.actions;

//Thunk creators
export const getTasks = (todoID: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
        const {data} = await todolistsAPI.getTasks(todoID);
        dispatch(setTasksAC({todoID, tasks: data.items}));
    } catch (error: any) {
        dispatch(setAppError({error: error.message}));
    } finally {
        dispatch(setAppStatus({status: 'idle'}));
    }

}
export const deleteTask = (payload: { todoID: string, taskID: string }) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch, payload.todoID, payload.taskID)

    try {
        const {data} = await todolistsAPI.deleteTask(payload);
        data.resultCode === ResultCodes.success
            ? dispatch(removeTaskAC({...payload}))
            : handleServerAppError(dispatch, data);

    } catch (error: any) {
        dispatch(setAppError({error: error.message}));

    } finally {
        preloaderControl('idle', dispatch, payload.todoID, payload.taskID)
    }
}
export const createTask = (todoID: string, title: string) => async (dispatch: Dispatch) => {
    preloaderControl('loading', dispatch, todoID);

    try {
        const {data} = await todolistsAPI.createTask(todoID, title);
        data.resultCode === ResultCodes.success
            ? dispatch(addTaskAC({task: data.data.item}))
            : handleServerAppError(dispatch, data)

    } catch (error: any) {
        dispatch(setAppError({error: error.message}));
    } finally {
        preloaderControl('idle', dispatch, todoID);
    }

}
export const updateTask = (todoID: string, taskID: string, domainModel: UpdateTaskModelType) =>
    async (dispatch: Dispatch, getState: () => AppRootStateType) => {
        preloaderControl('loading', dispatch, todoID, taskID)

        const allStateTasks = getState().tasks;
        const currentTask = allStateTasks[todoID].find(t => t.id === taskID);
        try {
            if (currentTask) {
                const {data} = await todolistsAPI.updateTask(todoID, taskID, {
                    title: currentTask.title,
                    startDate: currentTask.startDate,
                    priority: currentTask.priority,
                    description: currentTask.description,
                    deadline: currentTask.deadline,
                    status: currentTask.status,
                    ...domainModel
                })
                data.resultCode === ResultCodes.success && dispatch(updateTaskAC({todoID, taskID, model: domainModel}));
            }
        } catch (error) {
            error instanceof Error && dispatch(setAppError({error: error.message}));

        } finally {
            preloaderControl('idle', dispatch, todoID, taskID)
        }
    }

//Types
export type TaskStateType = { [key: string]: TaskEntityType[] }
export type TaskEntityType = TaskType & {
    entityStatus: RequestStatusType
}

type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


//     (state = initialState, action: ActionsType): TaskStateType => {
//     switch (action.type) {
//         case ACTIONS_TYPE.REMOVE_TASK:
//             return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)};
//         case ACTIONS_TYPE.ADD_TASK:
//             return {
//                 ...state,
//                 [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
//             }
//         case ACTIONS_TYPE.UPDATE_TASK:
//             return {
//                 ...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
//                     ? {...t, ...action.model} : t)
//             }
//         case ACTIONS_TYPE.ADD_TODOLIST:
//             return {...state, [action.tl.id]: []}
//         case ACTIONS_TYPE.REMOVE_TODOLIST:
//             let stateCopy = {...state};
//             delete stateCopy[action.todoID];
//             return stateCopy;
//         case ACTIONS_TYPE.SET_TODOLISTS:
//             let copy = {...state};
//             action.todolists.forEach(tl => {
//                 return copy[tl.id] = []
//             })
//             return copy;
//         case ACTIONS_TYPE.SET_TASKS:
//             return {...state, [action.todoID]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
//         case ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS:
//             return {...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
//                     ? {...t, entityStatus: action.status} : t)}
//         default:
//             return state;
//     }
// }
//Action creators
// export const removeTaskAC = (todoID: string, taskID: string) => ({
//     type: ACTIONS_TYPE.REMOVE_TASK,
//     todoID,
//     taskID
// } as const);
// export const addTaskAC = (task: TaskType) => ({type: ACTIONS_TYPE.ADD_TASK, task} as const);
// export const updateTaskAC = (todoID: string, taskID: string, model: UpdateTaskModelType) => ({
//     type: ACTIONS_TYPE.UPDATE_TASK,
//     todoID,
//     taskID,
//     model
// } as const);
// export const setTasksAC = (todoID: string, tasks: TaskType[]) => ({
//     type: ACTIONS_TYPE.SET_TASKS,
//     todoID,
//     tasks
// } as const);
// export const changeTaskEntityStatus = (todoID: string, taskID: string, status: RequestStatusType) => ({
//     type: ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS,
//     todoID,
//     taskID,
//     status
// } as const)
