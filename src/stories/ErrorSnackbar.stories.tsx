import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {DispatchErrorDecorator} from "./DispatchErrorDecorator";

export default {
    title: 'TodoList/ErrorSnackbar',
    component: ErrorSnackbar,
    decorators: [DispatchErrorDecorator],
} as ComponentMeta<typeof ErrorSnackbar>;

const Template: ComponentStory<typeof ErrorSnackbar> = () => <ErrorSnackbar/>

export const ErrorSnackbarStory = Template.bind({});