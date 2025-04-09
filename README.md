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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Your Name]
