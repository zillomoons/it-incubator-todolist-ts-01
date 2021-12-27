import {addNewTodoAC, removeTodoListAC, setTodolistsAC} from "../todoLists-reducer/todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../../api/tasks-api";
import {AppRootStateType} from "../../store/store";
import {ACTIONS_TYPE} from "../actions";
import {Dispatch} from "redux";


const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TASK:
            return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)};
        case ACTIONS_TYPE.ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case ACTIONS_TYPE.UPDATE_TASK:
            return {...state, [action.todoID]: state[action.todoID].map(t => t.id === action.taskID
                    ? {...t, ...action.model} : t)}
        case ACTIONS_TYPE.SET_TASKS:
            return {...state, [action.todoID]: action.tasks}
        case ACTIONS_TYPE.ADD_TODOLIST:
            return {...state, [action.todo.id]: []}
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            let stateCopy = {...state};
            delete stateCopy[action.todoID];
            return stateCopy;
        case ACTIONS_TYPE.SET_TODOLISTS:
            let copy = {...state};
            action.todolists.forEach(todo => {
                return copy[todo.id] = []
            })
            return copy;
        default:
            return state;
    }
}

//Action creators
export const removeTaskAC = (todoID: string, taskID: string) => ({type: ACTIONS_TYPE.REMOVE_TASK, todoID, taskID} as const);
export const addTaskAC = (task: TaskType) => ({type: ACTIONS_TYPE.ADD_TASK, task} as const);
export const updateTaskAC = (todoID: string, taskID: string, model: UpdateTaskModelType) => ({type: ACTIONS_TYPE.UPDATE_TASK, todoID, taskID, model} as const);
export const setTasksAC = (todoID: string, tasks: TaskType[]) => ({type: ACTIONS_TYPE.SET_TASKS, todoID, tasks} as const);

//Thunk creators
export const getTasks = (todoID: string) => async (dispatch: Dispatch<ActionsType>) => {
    const {data} = await tasksAPI.getTasks(todoID);
    dispatch(setTasksAC(todoID, data.items));
}
export const deleteTask = (todoID: string, taskID: string) => async (dispatch: Dispatch<ActionsType>) => {
    const {data} = await tasksAPI.deleteTask(todoID, taskID);

    if (data.resultCode === 0) {
        dispatch(removeTaskAC(todoID, taskID));
    }
}
export const createTask = (todoID: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    const {data} = await tasksAPI.createTask(todoID, title);

    if (data.resultCode === 0) {
        dispatch(addTaskAC(data.data.item));
    }
}
export const updateTask = (todoID: string, taskID: string, domainModel: UpdateTaskModelType) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    const allStateTasks = getState().tasks;
    const task = allStateTasks[todoID].find(t => t.id === taskID);

    if (task) {
        const {data} = await tasksAPI.updateTask(todoID, taskID, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        })
        if (data.resultCode === 0) {
            dispatch(updateTaskAC(todoID, taskID, domainModel));
        }
    }
}

//Types
export type TaskStateType = { [key: string]: TaskType[] }

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC> | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addNewTodoAC> | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTasksAC> | ReturnType<typeof setTodolistsAC>

type UpdateTaskModelType = {
    title ?: string
    description ?: string
    status ?: TaskStatuses
    priority ?: TaskPriorities
    startDate ?: string
    deadline ?: string
}
