import axios from "axios"

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
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

type GetTaskResType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string,
    }
})
export const tasksAPI = {
    createTask(todoID: string, title: string){
        return instance.post<ResponseType<TaskType>>(`${todoID}/tasks`, {title});
    },
    getTasks(todoID: string){
        return instance.get<GetTaskResType>(`${todoID}/tasks`);
    },
    updateTask(todoID: string, taskID: string, model: UpdateTaskType){

        return instance.put<ResponseType<TaskType>>(`${todoID}/tasks/${taskID}`, model);
    },
    deleteTask(todoID: string, taskID: string){
        return instance.delete<ResponseType>(`${todoID}/tasks/${taskID}`)
    }
}