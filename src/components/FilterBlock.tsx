import React, {useCallback} from "react"
import {MyButton} from "./Button";
import {changeFilterAC, FilterValuesType} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    filter: FilterValuesType
    todoID: string
}

export const FilterBlock = React.memo( ({filter, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const changeFilter = useCallback((value: FilterValuesType) => {
        dispatch(changeFilterAC(todoID, value));
    }, [dispatch, todoID])
    return <div className={'filterBlock'}>
        <MyButton name={'all'} callback={() => changeFilter('all')} filter={filter}/>
        <MyButton name={'active'} callback={() => changeFilter('active')} filter={filter}/>
        <MyButton name={'completed'} callback={() => changeFilter('completed')} filter={filter}/>
    </div>
})