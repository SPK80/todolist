import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {ErrorSnackbarStand} from "./ErrorSnackbarStand";

export default {
    title: 'todoList/ErrorSnackbar',
    component: ErrorSnackbarStand,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof ErrorSnackbarStand>;

const Template: ComponentStory<typeof ErrorSnackbarStand> = () =>
    <ErrorSnackbarStand/>

export const ErrorSnackbarStory = Template.bind({});