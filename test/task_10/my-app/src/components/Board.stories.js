import React from 'react';
import Board from './Board';

export default {
  title: 'Board',
  component: Board,
};

const Template = (args) => <Board {...args} />;

export const BoardDefault = Template.bind({});
BoardDefault.args = {
  squares: Array(9).fill(null),
};

export const BoardfillX = Template.bind({});
BoardfillX.args = {
  squares: Array(9).fill('X'),
};

export const BoardfillO = Template.bind({});
BoardfillO.args = {
  squares: Array(9).fill('O'),
};

export const BoardfillTryangle = Template.bind({});
BoardfillTryangle.args = {
  squares: Array(9).fill('△'),
};