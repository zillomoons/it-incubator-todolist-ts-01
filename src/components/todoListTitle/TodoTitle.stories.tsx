import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {TodoTitle} from "./TodoTitle";

export default {
    title: 'Todolist/TodoTitle',
    component: TodoTitle,
} as ComponentMeta<typeof TodoTitle>;

const Template: ComponentStory<typeof TodoTitle> = (args) => <TodoTitle {...args} />;

export const TodoTitleExample = Template.bind({});
TodoTitleExample.args = {
    title: 'Technologies',
};
