import React from "react"
import {MyButton} from "./Button";
import {FilterValuesType} from "../state/todoLists-reducer/todolists-reducer";
import {useActions} from "../store/store";
import {todolistsActions} from "../state/todoLists-reducer";
import styled from "styled-components";

type PropsType = {
    filter: FilterValuesType
    todoID: string
}

export const FilterBlock = React.memo(({filter, todoID}: PropsType) => {
    const {changeFilter} = useActions(todolistsActions);
    const renderFilterBtn = (text: FilterValuesType, filter: FilterValuesType) => {
        return <MyButton text={text} onClick={() => changeFilter({todoID, value: text})} filter={filter}/>
    }
    return <StyledFilterBlock>
        {renderFilterBtn('all', filter)}
        {renderFilterBtn('active', filter)}
        {renderFilterBtn('completed', filter)}
    </StyledFilterBlock>
})
const StyledFilterBlock = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  margin: 15px 0;
`
