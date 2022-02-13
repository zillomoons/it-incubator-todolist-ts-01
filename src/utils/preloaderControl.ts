import {RequestStatusType} from "../state/app-reducer/app-reducer";
import {changeEntityStatus} from "../state/todoLists-reducer/todolists-reducer";
import {Dispatch} from "redux";
import {changeTaskEntityStatus} from "../state/tasks-reducer/tasks-reducer";
import {appActions} from "../state/app-reducer/app-common-actions";


export const preloaderControl = (status: RequestStatusType, dispatch: Dispatch, todoID?: string, taskID?: string) => {
    dispatch(appActions.setAppStatus({status}));
    todoID && dispatch(changeEntityStatus({todoID, status}));
    todoID && taskID && dispatch(changeTaskEntityStatus({todoID, taskID, status}));
}
