import React, {useCallback} from "react"
import {MyButton} from "./Button";
import {FilterValuesType} from "../state/todoLists-reducer/todolists-reducer";
import {useActions} from "../store/store";
import {todolistsActions} from "../state/todoLists-reducer";

type PropsType = {
    filter: FilterValuesType
    todoID: string
}

export const FilterBlock = React.memo( ({filter, todoID}: PropsType) => {
    const {changeFilter} = useActions(todolistsActions);

    const changeFilterToAll = useCallback(()=>{
        changeFilter({todoID, value: 'all'})
    }, [todoID]);
    const changeFilterToActive = useCallback(()=>{
        changeFilter({todoID, value: 'active'})
    }, [todoID]);
    const changeFilterToCompleted = useCallback(()=>{
        changeFilter({todoID, value: 'completed'})
    }, [todoID]);
    return <div className={'filterBlock'}>
        <MyButton name={'all'} callback={changeFilterToAll} filter={filter}/>
        <MyButton name={'active'} callback={changeFilterToActive} filter={filter}/>
        <MyButton name={'completed'} callback={changeFilterToCompleted} filter={filter}/>
    </div>
})
