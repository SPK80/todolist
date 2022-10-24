import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { App } from "app/ui/App";
import { Provider } from "react-redux";
import { store } from "app/bll/store";

export default {
  title: "todoList/App",
  component: App,
  args: {},
  argTypes: {}
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export const AppStory = Template.bind({});
AppStory.args = {};
