import React from 'react';
import { fn } from '@storybook/test';
import { DragButton } from '../components/common/DragButton/DragButton';
import '../components/common/DragButton/DragButton.css';

export default {
  title: 'Components/DragButton',
  component: DragButton,
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    tooltipPosition: {
      control: { type: 'select', options: ['left', 'right'] }
    },
    tooltipShape: {
      control: { type: 'select', options: ['rounded', 'circular'] }
    },
    valueFormat: {
      control: { type: 'select', options: ['percentage', 'value', 'custom'] }
    },
    buttonSize: { control: 'number' },
    maxDragDistance: { control: 'number' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
  },
};

const Template = (args) => <DragButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Bleed',
  backgroundColor: '#ee6e7e',
  textColor: 'white',
  tooltipPosition: 'right',
  tooltipShape: 'rounded',
  buttonSize: 80,
  maxDragDistance: 150,
  minValue: 0,
  maxValue: 100,
  valueFormat: 'percentage',
  onRelease: (value) => console.log('Released at:', value),
  onClick: () => console.log('Clicked'),
};

export const WithLeftTooltip = Template.bind({});
WithLeftTooltip.args = {
  ...Default.args,
  tooltipPosition: 'left',
};

export const WithCircularTooltip = Template.bind({});
WithCircularTooltip.args = {
  ...Default.args,
  tooltipShape: 'circular',
};

export const CustomValue = Template.bind({});
CustomValue.args = {
  ...Default.args,
  valueFormat: 'value',
  minValue: 0,
  maxValue: 10,
  label: 'Scale',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  ...Default.args,
  className: 'custom-button',
  children: 'Custom Styled Button',
};

export const WithPositionTracking = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  
  return (
    <div>
      <DragButton
        onDrag={(e, { x, y }) => setPosition({ x, y })}
        onDragStart={fn()}
        onDragEnd={fn()}
      >
        Drag to Track Position
      </DragButton>
      <p>
        Position: x={Math.round(position.x)}, y={Math.round(position.y)}
      </p>
    </div>
  );
}; 