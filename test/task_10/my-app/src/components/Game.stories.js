import React from 'react';
import Game from './Game';

export default {
  title: 'Game',
  component: Game,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <Game {...args} />;

export const GameDefault = Template.bind({});
GameDefault.args = {
  history:[{squares:["","","","","","","","",""]}],
  stepNumber:0,
  xIsNext: true,
};