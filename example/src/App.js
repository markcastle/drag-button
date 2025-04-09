import React, { useState } from 'react';
import { DragButton } from 'drag-button';
import 'drag-button/dist/index.css';
import './styles.css';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);

  const handleDragStart = (event, pos) => {
    setIsDragging(true);
    console.log('Drag started at:', pos);
  };

  const handleDrag = (event, pos) => {
    setPosition(pos);
    console.log('Dragging at:', pos);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
    setDragCount(prev => prev + 1);
    console.log('Drag ended');
  };

  return (
    <div className="app">
      <h1>🎯 DragButton Examples</h1>
      
      <div className="demo-grid">
        <div className="demo-card">
          <h3>🔄 Basic Drag</h3>
          <p className="demo-description">
            A simple draggable button with basic functionality.
          </p>
          <DragButton
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            Drag me!
          </DragButton>
          <div className="position-display">
            Drag count: {dragCount}
          </div>
        </div>

        <div className="demo-card">
          <h3>📊 Position Tracking</h3>
          <p className="demo-description">
            Track the button's position in real-time as you drag it.
          </p>
          <DragButton
            onDrag={(event, pos) => setPosition(pos)}
            style={{ marginBottom: '20px' }}
          >
            Drag to track position
          </DragButton>
          <div className="position-display">
            X: {Math.round(position.x)}px<br />
            Y: {Math.round(position.y)}px
          </div>
        </div>

        <div className="demo-card">
          <h3>🚫 Disabled State</h3>
          <p className="demo-description">
            The button can be disabled to prevent dragging.
          </p>
          <DragButton disabled>
            Cannot drag me
          </DragButton>
        </div>

        <div className="demo-card">
          <h3>🎨 Custom Styling</h3>
          <p className="demo-description">
            Apply custom styles using the className prop.
          </p>
          <DragButton className="custom-button">
            Custom styled button
          </DragButton>
        </div>
      </div>
    </div>
  );
}

export default App; 