import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import App from "./App";
import {Provider, useDispatch} from "react-redux";
import {storyBookStore} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/App',
    component: App,
    decorators: [
        Story => (
            <Provider store={storyBookStore}>
                <Story />
            </Provider>
        )
    ]
} as ComponentMeta<typeof App>;

export const AppExample = () =>{
    const dispatch = useDispatch();
    return <App />
}