import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "../../state/tasksReducer";
import {todoListReducer} from "../../state/todoListReducer";
import { v1 } from 'uuid';
import {AppRootStateType} from "../../store/store";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ],
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
