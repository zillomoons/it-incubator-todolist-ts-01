import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {store} from "../../store/store";
import {Provider, useDispatch} from "react-redux";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
} as ComponentMeta<typeof Task>;


export const TaskIsDoneExample = (args: any) => {
    const dispatch = useDispatch();
    return <Task {...args}/>
}
TaskIsDoneExample.args = {
    todoID: 'todolistId1',
    task: {id: '1', title: 'JS', isDone: true},
}
export const TaskIsNotDoneExample = (args: any) => {
    const dispatch = useDispatch();
    return <Task {...args}/>
}
TaskIsNotDoneExample.args = {
    todoID: 'todolistId1',
    task: {id: '1', title: 'JS', isDone: false},
}