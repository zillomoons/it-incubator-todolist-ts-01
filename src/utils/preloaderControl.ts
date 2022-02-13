import {RequestStatusType} from "../state/app-reducer/app-reducer";
import {Dispatch} from "redux";
import {appActions} from "../state/app-reducer/app-common-actions";
import {todolistsActions} from "../state/todoLists-reducer";
import {tasksActions} from "../state/tasks-reducer";

const {changeEntityStatus} = todolistsActions;
const {changeTaskEntityStatus} = tasksActions;
export const preloaderControl = (status: RequestStatusType, dispatch: Dispatch, todoID?: string, taskID?: string) => {
    dispatch(appActions.setAppStatus({status}));
    todoID && dispatch(changeEntityStatus({todoID, status}));
    todoID && taskID && dispatch(changeTaskEntityStatus({todoID, taskID, status}));
}
