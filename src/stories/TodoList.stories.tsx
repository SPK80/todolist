import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TodoList} from "../Components/TodoList";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;

export const TodoListStory = Template.bind({});
TodoListStory.args = {
    todoList: {
        title: 'Test',
        filter: "all",
        id: '1',
        addedDate: (new Date()).toLocaleString(),
        order: 0
    }
}