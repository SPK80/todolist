import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    confirm: action('Confirmed form value')
};