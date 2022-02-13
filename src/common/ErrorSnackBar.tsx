import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {useActions} from "../store/redux-utils";
import {appActions} from "../state/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackBar = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const {setAppError} = useActions(appActions);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppError({error: null});
    };
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
