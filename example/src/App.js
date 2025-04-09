import React, { useState } from 'react';
import { DragButton } from '../../src';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
    console.log('Drag ended');
  };

  return (
    <div className="app">
      <h1>DragButton Example</h1>
      
      <div className="demo-section">
        <h2>Basic Usage</h2>
        <DragButton
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          Drag me!
        </DragButton>
      </div>

      <div className="demo-section">
        <h2>With Position Tracking</h2>
        <DragButton
          onDrag={(event, pos) => setPosition(pos)}
          style={{ marginBottom: '20px' }}
        >
          Drag me and watch the position
        </DragButton>
        <div className="position-display">
          Current position: X: {Math.round(position.x)}, Y: {Math.round(position.y)}
        </div>
      </div>

      <div className="demo-section">
        <h2>Disabled State</h2>
        <DragButton disabled>
          Cannot drag me
        </DragButton>
      </div>

      <style jsx>{`
        .app {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .demo-section {
          margin: 40px 0;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
        }

        .position-display {
          margin-top: 10px;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 4px;
          font-family: monospace;
        }

        h1 {
          color: #333;
          text-align: center;
        }

        h2 {
          color: #666;
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}

export default App; 