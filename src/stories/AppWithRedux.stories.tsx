import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AppWithRedux} from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../store";

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    args: {},
    argTypes: {},
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => {
    return (
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    )
}

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {};