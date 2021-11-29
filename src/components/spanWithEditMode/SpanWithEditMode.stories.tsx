import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {SpanWithEditMode} from "./SpanWithEditMode";

export default {
    title: 'Todolist/SpanWithEditMode',
    component: SpanWithEditMode,
    argTypes: {
        editTitle: {
            description: 'Value of spanWithEditMode changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value of SpanWithEditMode'
        }
    },
} as ComponentMeta<typeof SpanWithEditMode>;

const Template: ComponentStory<typeof SpanWithEditMode> = (args) => <SpanWithEditMode {...args} />;

export const SpanWithEditModeExample = Template.bind({});
SpanWithEditModeExample.args = {
    editTitle: action('Value of spanWithEditMode changed')
};
