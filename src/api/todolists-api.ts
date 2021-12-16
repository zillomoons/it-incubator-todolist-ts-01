import axios from "axios";

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
    }

}

// Types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}