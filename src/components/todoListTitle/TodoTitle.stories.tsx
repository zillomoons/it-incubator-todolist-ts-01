import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {TodoTitle} from "./TodoTitle";

export default {
    title: 'Todolist/TodoTitle',
    component: TodoTitle,
} as ComponentMeta<typeof TodoTitle>;

const Template: ComponentStory<typeof TodoTitle> = (args) => <TodoTitle {...args} />;

export const TodoTitleExample = Template.bind({});
TodoTitleExample.args = {
    title: 'Technologies',
    editTodoTitle: action('Edit mode changed'),
    removeTodoList: action('Delete button clicked'),
};