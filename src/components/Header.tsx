import React from "react"
import styled from "styled-components";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "../store/store";
import {RequestStatusType} from "../state/app-reducer/app-reducer";
import {useDispatch} from "react-redux";
import {logout} from "../state/auth-reducer/auth-reducer";
import { AiOutlineLogout } from "react-icons/ai";

export const Header = React.memo(() => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const isLoggedIn = useAppSelector<boolean>(state=> state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const onLogout = () =>{
        dispatch(logout());
    }
    return (
        <>
            <StyledHeaderContainer>
                <h3 style={{marginLeft: '15px'}}>Todo App</h3>
                {isLoggedIn && <StyledLogout onClick={onLogout}>LOGOUT <AiOutlineLogout /></StyledLogout>}
            </StyledHeaderContainer>
            {status === 'loading' && <LinearProgress color='secondary'/>}
        </>

    )
})
const StyledHeaderContainer = styled.div`
  height: 60px;
  background: darkcyan;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledLogout = styled.button`
  margin: 0 15px;
  background: white;
  color: darkcyan;
  font-weight: bold;
  border: none;
  padding: 2px 8px;
  border-radius: 15px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  transition: .3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 10px 5px rgba(255, 255, 147, 0.25);
    transform: translateY(-1px);
  }
`
