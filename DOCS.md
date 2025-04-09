## Accessibility and Compatibility

### Accessibility Considerations

- The component provides visual feedback through both color and position changes
- Consider providing alternative input methods for users who rely on keyboard navigation
- All colors can be customized to meet contrast requirements for accessibility

### Browser Compatibility

- Works in all modern browsers that support React
- Touch events are supported on mobile devices
- The `touchAction: 'none'` CSS property prevents unwanted scrolling during drag operations

## Best Practices

### When Using This Component

1. **Provide Clear Labeling**: Make the button's purpose clear through its label
2. **Use Consistent Colors**: Match your app's color scheme for visual consistency
3. **Set Appropriate Ranges**: Configure min/max values that make sense for your use case
4. **Handle Events Properly**: Implement handlers for both `onRelease` and `onClick`
5. **Consider Mobile Users**: Ensure the button is large enough for comfortable touch interaction

### Customization Tips

- For smaller screens, consider reducing `buttonSize` and `maxDragDistance`
- Choose tooltip positions based on your layout to avoid UI overlap
- Use the `customValueFormatter` for domain-specific value display

## Known Limitations

- The drag direction is currently fixed to vertical (upward) movement
- The component doesn't yet support RTL languages with automatic direction adjustment
- No keyboard-only interaction mode is available by default

## Future Enhancements

Potential improvements that could be added:

- Horizontal drag support
- ARIA attributes for improved accessibility
- Animation options for transitions
- Support for custom button shapes
- Additional tooltip positions (top, bottom)
# DragButton Component

A reusable, customizable React button that responds to drag gestures, showing a drag background and a tooltip on the side.

## Features

- **Interactive Drag Behavior**: Press and drag upward to increase value
- **Background Indication**: Shows a faded background indicating the drag bounds
- **Side Tooltip**: Configurable tooltip position (left or right of button)
- **Normal Click Support**: Functions as a regular button when pressed without dragging
- **Fully Customizable**: Appearance, sizing, and behavior can be configured through props
- **Touch & Mouse Support**: Works with both touch and mouse events
- **Value Formatting Options**: Display percentage, raw values, or custom formatted values

## Installation

```bash
# Copy both files to your project
cp DragButton.jsx DragButton.css your-project/src/components/
```

## Basic Usage

```jsx
import React, { useState } from 'react';
import DragButton from './components/DragButton';

function App() {
  const [value, setValue] = useState(0);
  
  return (
    <div className="App">
      <DragButton 
        label="Bleed" 
        tooltipPosition="right"
        onRelease={(val) => {
          console.log(`Button released at: ${val}`);
          setValue(val);
        }}
      />
      <p>Current value: {value}</p>
    </div>
  );
}
```

## Props

### Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `node` | `'Button'` | Content displayed inside the button |
| `backgroundColor` | `string` | `'#ee6e7e'` | Background color of the button and drag area |
| `textColor` | `string` | `'white'` | Text color of the button label |
| `hoverBackgroundColor` | `string` | `'#f48c98'` | Background color on hover |
| `activeBackgroundColor` | `string` | `'#da5c6c'` | Background color when dragging |
| `tooltipBackgroundColor` | `string` | `'#ee6e7e'` | Background color of the tooltip |
| `tooltipTextColor` | `string` | `'white'` | Text color of the tooltip |
| `tooltipShape` | `'rounded'` \| `'circular'` | `'rounded'` | Shape of the tooltip |
| `tooltipPosition` | `'left'` \| `'right'` | `'right'` | Position of the tooltip relative to button |

### Sizing

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `80` | Size of the button in pixels (width and height) |
| `tooltipWidth` | `number` | `70` | Minimum width of the tooltip in pixels |
| `tooltipHeight` | `number` | `40` | Minimum height of the tooltip in pixels |

### Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxDragDistance` | `number` | `150` | Maximum distance the user can drag upward in pixels |

### Value Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minValue` | `number` | `0` | Minimum value that will be emitted |
| `maxValue` | `number` | `100` | Maximum value that will be emitted |
| `valueFormat` | `'percentage'` \| `'value'` \| `'custom'` | `'percentage'` | Format of the value displayed in the tooltip |
| `customValueFormatter` | `function` | `(val) => val` | Function to format the value when using `'custom'` format |

### Events

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRelease` | `function` | `() => {}` | Callback when the button is released, receives the current value |
| `onClick` | `function` | `() => {}` | Callback when the button is clicked without dragging |

### Additional Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS class names to apply |
| `style` | `object` | `{}` | Additional inline styles to apply |

## Examples

### Basic Button with Right Tooltip (Default)

```jsx
<DragButton 
  label="Bleed"
  onRelease={(val) => console.log(`Released at: ${val}%`)}
/>
```

### Button with Left Tooltip

```jsx
<DragButton 
  label="Bleed"
  tooltipPosition="left"
  onRelease={(val) => console.log(`Released at: ${val}%`)}
/>
```

### Custom Range Button (0-5 Stars)

```jsx
<DragButton 
  label="Rate"
  minValue={0}
  maxValue={5}
  valueFormat="value"
  backgroundColor="#4a90e2"
  tooltipBackgroundColor="#4a90e2"
  tooltipPosition="left"
  onRelease={(val) => console.log(`Rating: ${val.toFixed(1)} stars`)}
/>
```

### Custom Formatting (Temperature)

```jsx
<DragButton 
  label="Temp"
  minValue={15}
  maxValue={35}
  valueFormat="custom"
  customValueFormatter={(val) => `${val.toFixed(1)}°C`}
  backgroundColor="#e74c3c"
  tooltipBackgroundColor="#e74c3c"
  tooltipShape="circular"
  buttonSize={100}
  onRelease={(val) => console.log(`Temperature set to: ${val.toFixed(1)}°C`)}
/>
```) => console.log(`Temperature set to: ${val.toFixed(1)}°C`)}
/>
```

## Implementation Details

The component is built using React hooks and follows a separation of concerns by using an external CSS file for styling.

### File Structure
- `DragButton.jsx` - React component logic
- `DragButton.css` - Styles for the component

### Key Features Explained

#### Background Indicator
The component shows a faded background that represents the total possible drag area when the button is pressed. This provides a visual cue to the user about how far they can drag.

```jsx
<div className="drag-background" style={backgroundStyle}></div>
```

#### Button Movement
The button physically moves upward as the user drags, using CSS transform:

```css
transform: translateY(-${dragDistance}px)
```

#### Side Tooltip
The tooltip appears on either the left or right side of the button (configurable) and shows the current value:

```jsx
<div className={`drag-tooltip ${tooltipShape} ${tooltipPosition}`} style={tooltipStyle}>
  {calculateValue()}
</div>
```

#### Connector Line
A thin line connects the button to the tooltip for visual clarity:

```jsx
<div className="drag-connector" style={connectorStyle}></div>
```

### Event Handling

The component handles both mouse and touch events for maximum compatibility:

1. `onMouseDown`/`onTouchStart` - Begins the drag operation
2. Mouse move/touch move events - Updates drag distance based on vertical movement
3. Mouse up/touch end events - Finalizes the operation, triggers callback with final value

### CSS Classes

The component uses several CSS classes for styling:

- `.drag-button-container` - Outer container
- `.drag-background` - Background indicating drag bounds
- `.drag-button` - The actual button element
- `.drag-tooltip` - Value tooltip
- `.drag-connector` - Line connecting button and tooltip

Additional modifier classes:
- `.dragging` - Applied during drag operations
- `.rounded`/`.circular` - Tooltip shape
- `.left`/`.right` - Tooltip position