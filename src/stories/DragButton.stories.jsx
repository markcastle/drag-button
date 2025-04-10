import React from 'react';
import { fn } from '@storybook/test';
import DragButton from '../../src/components/DragButton';

export default {
  title: 'Components/DragButton',
  component: DragButton,
  argTypes: {
    onDragStart: { control: false },
    onDrag: { control: false },
    onDragEnd: { control: false },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => <DragButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Drag Me',
  onDragStart: fn(),
  onDrag: fn(),
  onDragEnd: fn(),
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

// Example with drag position tracking
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
      <p>Position: x={position.x}, y={position.y}</p>
    </div>
  );
}; 