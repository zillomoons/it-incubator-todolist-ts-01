import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../stories/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import { TaskEntityType } from '../../../state/tasks-reducer/tasks-reducer';

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const UsingReduxComponent = () => {
    const task = useSelector<AppRootStateType, TaskEntityType>(state => state.tasks['todolistId1'][0])
    return <Task todoID='todolistId1' task={task} />
}

const Template: ComponentStory<typeof UsingReduxComponent> = (args) => <UsingReduxComponent />;

export const TaskStory = Template.bind({});
TaskStory.args = {};

// const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
// export const TaskIsNotDoneStory = Template.bind({});
// TaskIsNotDoneStory.args = {
//     todoID: "todolistId1",
//     task: {id: v1(), title: "React", isDone: false},
// };
// export const TaskIsDoneStory = Template.bind({});
// TaskIsDoneStory.args = {
//     todoID: "todolistId1",
//     task: {id: v1(), title: "JS", isDone: true},
// };