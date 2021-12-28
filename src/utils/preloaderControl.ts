import {RequestStatusType, setStatus} from "../state/app-reducer/app-reducer";
import {changeEntityStatus} from "../state/todoLists-reducer/todolists-reducer";
import {Dispatch} from "redux";
import {changeTaskEntityStatus} from "../state/tasks-reducer/tasks-reducer";

export const preloaderControl = (status: RequestStatusType, dispatch: Dispatch, todoID?: string, taskID?: string) => {
    dispatch(setStatus(status));
    todoID && dispatch(changeEntityStatus(todoID, status));
    todoID && taskID && dispatch(changeTaskEntityStatus(todoID, taskID, status));

}
