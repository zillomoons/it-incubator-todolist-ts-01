import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from 'uuid';
import {AppRootStateType} from "../../store/store";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: 'string',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 1,
                addedDate: ''
            },
            {
                id: v1(),
                title: "JS",
                description: 'string',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 1,
                addedDate: ''
            },

        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                description: 'string',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 1,
                addedDate: ''},

        ],
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
