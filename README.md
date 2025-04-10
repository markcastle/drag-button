# 🎯 DragButton

A lightweight, accessible React component for creating draggable buttons with smooth animations and touch support.

## ✨ Features

- 🖱️ Smooth drag interactions
- 📱 Touch device support
- ♿ Accessibility focused
- 🎨 Customizable styling
- 🔄 Position tracking
- 🚫 Disabled state support

## 📦 Installation

```bash
npm install drag-button
# or
yarn add drag-button
```

## 🚀 Usage

```jsx
import { DragButton } from 'drag-button';

function App() {
  const handleDragStart = (event, { offsetX, offsetY }) => {
    console.log('Drag started at:', offsetX, offsetY);
  };

  const handleDrag = (event, { x, y }) => {
    console.log('Dragging at:', x, y);
  };

  const handleDragEnd = (event) => {
    console.log('Drag ended');
  };

  return (
    <DragButton
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      Drag me!
    </DragButton>
  );
}
```

## 🛠️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | Required | Content to be rendered inside the button |
| `onDragStart` | `function` | `undefined` | Called when drag starts |
| `onDrag` | `function` | `undefined` | Called while dragging |
| `onDragEnd` | `function` | `undefined` | Called when drag ends |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disables the drag functionality |

## 🎨 Styling

The component comes with default styles but can be customized using the `className` prop:

```jsx
<DragButton className="custom-button">
  Custom Styled Button
</DragButton>
```

## 📱 Touch Support

The component automatically handles touch events for mobile devices. No additional configuration needed!

## ♿ Accessibility

- Proper focus management
- Keyboard navigation support
- ARIA attributes
- High contrast mode support

## 🔍 Example with Position Tracking

```jsx
import { DragButton } from 'drag-button';
import { useState } from 'react';

function PositionTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
}
```

## 📚 Storybook Documentation

### Running Storybook

To explore the component interactively and view all examples:

```bash
npm run storybook
```

Then visit http://localhost:6006 in your browser.

To stop the Storybook server:
- Method 1: Press `Ctrl + C` in the terminal window where Storybook is running
  - When prompted "Terminate batch job (Y/N)?", type `Y` and press Enter
- Method 2: Using TaskKill (if the process is stuck or Method 1 doesn't work)
  ```bash
  # Find the process using port 6006
  netstat -ano | findstr :6006
  # Look for the PID in the LISTENING state (usually the first entry)
  # Kill that process (replace XXXX with the PID)
  taskkill /PID XXXX /F
  ```

### Available Stories

- **Default**: Basic DragButton implementation with standard functionality
- **Disabled**: Example of the button in a disabled state
- **CustomStyle**: Demonstration of custom styling options
- **WithPositionTracking**: Interactive example showing real-time position tracking

### Development with Storybook

#### Adding New Stories

1. Create stories in `src/stories` directory
2. Follow the naming convention: `ComponentName.stories.jsx`
3. Use the template pattern for consistent story creation:

```jsx
import React from 'react';
import { fn } from '@storybook/test';
import DragButton from '../../src/components/DragButton';

export default {
  title: 'Components/DragButton',
  component: DragButton,
  argTypes: {
    // Define your props here
  },
};

const Template = (args) => <DragButton {...args} />;

export const YourStory = Template.bind({});
YourStory.args = {
  // Define your story props here
};
```

#### Best Practices

- Document all props using `argTypes`
- Include examples of common use cases
- Add interactive examples for complex features
- Use actions to demonstrate event handling
- Include accessibility information in the docs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Mark Castle
