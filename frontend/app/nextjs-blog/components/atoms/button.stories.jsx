import React from 'react';

import Button from './button';

export default {
  title: 'Example/Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const Submit = Template.bind({});
Submit.args = {
  color: 'blue',
  size: 'medium',
  disabled: false,
  onClick: () => {},
  children: "応募する",
};

export const Delete = Template.bind({});
Delete.args = {
  color: 'red',
  size: 'small',
  disabled: false,
  onClick: () => {},
  children: "削除する",
};

export const DisabledDelete = Template.bind({});
DisabledDelete.args = {
  color: 'red',
  size: 'small',
  disabled: true,
  onClick: () => {},
  children: "削除する",
};
