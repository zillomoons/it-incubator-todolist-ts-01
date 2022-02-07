import {RequestStatusType, setAppStatus} from "../state/app-reducer/app-reducer";
import {changeEntityStatus} from "../state/todoLists-reducer/todolists-reducer";
import {Dispatch} from "redux";

export const preloaderControl = (status: RequestStatusType, dispatch: Dispatch, todoID?: string, taskID?: string) => {
    dispatch(setAppStatus({status}));
    todoID && dispatch(changeEntityStatus({todoID, status}));
    // todoID && taskID && dispatch(changeTaskEntityStatus({todoID, taskID, status}));

}
