import React from "react"
import {MyButton} from "./Button";
import {FilterValuesType} from "../state/todoListReducer";

type PropsType = {
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType) => void
}

export const FilterBlock = ({filter, changeFilter}:PropsType) => {
    return <div className={'filterBlock'}>
        <MyButton name={'all'} callback={() => changeFilter('all')} filter={filter}/>
        <MyButton name={'active'} callback={() => changeFilter('active')} filter={filter}/>
        <MyButton name={'completed'} callback={() => changeFilter('completed')} filter={filter}/>
    </div>
}