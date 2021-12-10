import React from 'react';
import {ComponentMeta, ComponentStory, Story} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator, storyBookStore} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppStory = Template.bind({});
AppStory.args = {};


