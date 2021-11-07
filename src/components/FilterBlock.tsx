import React from "react"
import {MyButton} from "./Button";
import {ChangeFilterAC, FilterValuesType} from "../state/todoListReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    filter: FilterValuesType
    todoID: string
}

export const FilterBlock = ({filter, todoID}: PropsType) => {
    const dispatch = useDispatch();
    const changeFilter = (value: FilterValuesType,) => {
        dispatch(ChangeFilterAC(todoID, value));
    }
    return <div className={'filterBlock'}>
        <MyButton name={'all'} callback={() => changeFilter('all')} filter={filter}/>
        <MyButton name={'active'} callback={() => changeFilter('active')} filter={filter}/>
        <MyButton name={'completed'} callback={() => changeFilter('completed')} filter={filter}/>
    </div>
}