import axios from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    }
})

export const todolistsAPI = {
    updateTodolist(todoID: string, title: string){
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title});
    },
    createTodolist(title: string){
        return instance.post<ResponseType< {item: TodolistType} >>(`todo-lists`, {title});
    },
    deleteTodolist(todoID: string){
        return instance.delete<ResponseType>(`todo-lists/${todoID}`);
    },
    getTodolists(){
        return instance.get<TodolistType[]>(`todo-lists`);
    },
    createTask(todoID: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoID}/tasks`, {title});
    },
    getTasks(todoID: string){
        return instance.get<GetTaskResType>(`todo-lists/${todoID}/tasks`);
    },
    updateTask(todoID: string, taskID: string, model: UpdateTaskType){
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoID}/tasks/${taskID}`, model);
    },
    deleteTask( payload: {todoID: string, taskID: string}){
        return instance.delete<ResponseType>(`todo-lists/${payload.todoID}/tasks/${payload.taskID}`)
    }
}

export const authAPI = {
    login({email, password, rememberMe = false}: LoginParamsType){
        return instance.post<ResponseType<{userId: number}>>('auth/login', {email, password, rememberMe});
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    },
    me(){
        return instance.get<ResponseType<AuthDataType>>('auth/me')
    },
}

// Types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe ?: boolean
    captcha ?: boolean
}
export type AuthDataType = {
    id: number
    login: string
    email: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = {field: string, error: string}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorType[]
    data: D
}
export type TaskType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}

type GetTaskResType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
