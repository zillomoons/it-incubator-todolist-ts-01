import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemInput} from "./AddItemInput";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemInput',
    component: AddItemInput,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked' },
    },
} as ComponentMeta<typeof AddItemInput>;

const asyncCallback = async (...params: any[]) => {
    return action('Button inside form clicked', ...params)
}

const Template: ComponentStory<typeof AddItemInput> = (args) => <AddItemInput {...args} />;

export const AddItemInputExample = Template.bind({});
AddItemInputExample.args = {
    addNewItemTitle: asyncCallback
};

