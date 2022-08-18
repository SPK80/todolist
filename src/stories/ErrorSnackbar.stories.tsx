import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Button} from "@material-ui/core";
import {setAppErrorAC} from "../app/appReducer";
import {useDispatch} from "react-redux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/ErrorSnackbar',
    component: ErrorSnackbar,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof ErrorSnackbar>;

const Template: ComponentStory<typeof ErrorSnackbar> = () => {
    const dispatch = useDispatch()
    return <div>
        <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => dispatch(setAppErrorAC('Some error'))}
        >
            Dispatch Error
        </Button>
        <ErrorSnackbar/>
    </div>
}

export const ErrorSnackbarStory = Template.bind({});