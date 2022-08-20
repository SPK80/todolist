import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {TodoList} from "../features/TodoListsList/TodoList/TodoList";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {RequestStatusType} from "../app/appReducer";


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
        order: 0,
        entityStatus: RequestStatusType.idle,
    }
}