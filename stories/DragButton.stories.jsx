import React from 'react';
import { DragButton } from '../src';

export default {
  title: 'Components/DragButton',
  component: DragButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onDragStart: { action: 'dragStart' },
    onDrag: { action: 'drag' },
    onDragEnd: { action: 'dragEnd' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
};

const Template = (args) => <DragButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Drag me',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Cannot drag me',
  disabled: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  children: 'Styled button',
  className: 'custom-button',
};

// Example with drag position tracking
export const WithPositionTracking = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <div>
      <DragButton
        onDrag={(event, pos) => setPosition(pos)}
        style={{ marginBottom: '20px' }}
      >
        Drag me and watch the position
      </DragButton>
      <div>
        Current position: X: {Math.round(position.x)}, Y: {Math.round(position.y)}
      </div>
    </div>
  );
}; 