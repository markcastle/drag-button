import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './DragButton.css';

const DragButton = ({
  children,
  onDragStart = undefined,
  onDrag = undefined,
  onDragEnd = undefined,
  className = '',
  disabled = false,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback((event) => {
    if (disabled) return;
    
    setIsDragging(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    
    setPosition({ x: offsetX, y: offsetY });
    
    if (onDragStart) {
      onDragStart(event, { offsetX, offsetY });
    }
  }, [disabled, onDragStart]);

  const handleDrag = useCallback((event) => {
    if (!isDragging || disabled) return;
    
    const newX = event.clientX - position.x;
    const newY = event.clientY - position.y;
    
    if (onDrag) {
      onDrag(event, { x: newX, y: newY });
    }
  }, [isDragging, disabled, onDrag, position]);

  const handleDragEnd = useCallback((event) => {
    if (disabled) return;
    
    setIsDragging(false);
    
    if (onDragEnd) {
      onDragEnd(event);
    }
  }, [disabled, onDragEnd]);

  if (!children) {
    throw new Error('DragButton requires children prop');
  }

  return (
    <button
      className={`drag-button ${isDragging ? 'dragging' : ''} ${className}`}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

DragButton.propTypes = {
  children: PropTypes.node.isRequired,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export { DragButton }; 