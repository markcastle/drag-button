import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DragButton.css';

/**
 * DragButton - A customizable round button that responds to touch/mouse dragging gestures
 * 
 * Features:
 * - Press and drag upward to increase value
 * - Background indication of drag bounds
 * - Configurable tooltip position (left/right)
 * - Customizable appearance and behavior
 */
const DragButton = ({
  // Button content/appearance
  label = 'Button',
  backgroundColor = '#ee6e7e',
  textColor = 'white',
  hoverBackgroundColor = '#f48c98',
  activeBackgroundColor = '#da5c6c',
  tooltipBackgroundColor = '#ee6e7e',
  tooltipTextColor = 'white',
  tooltipShape = 'rounded', // 'rounded' or 'circular'
  tooltipPosition = 'right', // 'left' or 'right'
  
  // Sizing
  buttonSize = 80,
  tooltipWidth = 70,
  tooltipHeight = 40,
  
  // Behavior
  maxDragDistance = 150,
  
  // Value configuration
  minValue = 0,
  maxValue = 100,
  valueFormat = 'percentage', // 'percentage', 'value', or 'custom'
  customValueFormatter = (val) => val,
  
  // Events
  onRelease = () => {},
  onClick = () => {},
  
  // Additional styling
  className = '',
  style = {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const buttonRef = useRef(null);
  const startYRef = useRef(0);
  const containerRef = useRef(null);

  // Calculate current value based on drag distance
  const calculateValue = () => {
    const percentage = Math.min(100, Math.max(0, (dragDistance / maxDragDistance) * 100));
    
    if (valueFormat === 'percentage') {
      return Math.round(percentage) + '%';
    } else if (valueFormat === 'value') {
      const value = minValue + (percentage / 100) * (maxValue - minValue);
      return Math.round(value * 10) / 10; // Round to 1 decimal place
    } else if (valueFormat === 'custom') {
      const value = minValue + (percentage / 100) * (maxValue - minValue);
      return customValueFormatter(value);
    }
    
    return Math.round(percentage) + '%';
  };

  // Get the numeric value (not formatted)
  const getNumericValue = () => {
    const percentage = Math.min(100, Math.max(0, (dragDistance / maxDragDistance) * 100));
    return minValue + (percentage / 100) * (maxValue - minValue);
  };

  const handleMouseDown = (e) => {
    startYRef.current = e.clientY;
    setIsDragging(true);
    
    // Add event listeners for drag and release
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
    
    // Prevent scrolling while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const diff = startYRef.current - e.clientY;
      setDragDistance(Math.max(0, Math.min(maxDragDistance, diff)));
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const diff = startYRef.current - e.touches[0].clientY;
      setDragDistance(Math.max(0, Math.min(maxDragDistance, diff)));
      
      // Prevent scrolling while dragging
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      // If there was minimal drag distance, treat as a click
      if (dragDistance < 5) {
        onClick(0);
      } else {
        // Otherwise, get the current value and call onRelease
        onRelease(getNumericValue());
      }
      
      // Reset state
      setIsDragging(false);
      setDragDistance(0);
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      // If there was minimal drag distance, treat as a click
      if (dragDistance < 5) {
        onClick(0);
      } else {
        // Otherwise, get the current value and call onRelease
        onRelease(getNumericValue());
      }
      
      // Reset state
      setIsDragging(false);
      setDragDistance(0);
    }
  };

  // Clean up event listeners on unmount or when isDragging changes
  useEffect(() => {
    // Only add cleanup if we're currently dragging
    if (isDragging) {
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isDragging]);

  // Dynamic inline styles
  const containerStyle = {
    height: `${buttonSize}px`,
    width: `${buttonSize}px`,
    ...style
  };

  const backgroundStyle = {
    width: `${buttonSize}px`,
    height: `${maxDragDistance + buttonSize}px`,
    backgroundColor: backgroundColor,
    bottom: 0
  };

  const buttonStyle = {
    width: `${buttonSize}px`,
    height: `${buttonSize}px`,
    backgroundColor: isDragging ? activeBackgroundColor : backgroundColor,
    color: textColor,
    bottom: 0,
    transform: `translateY(-${dragDistance}px)`
  };

  const tooltipStyle = {
    backgroundColor: tooltipBackgroundColor,
    color: tooltipTextColor,
    width: tooltipShape === 'circular' ? `${tooltipWidth}px` : 'auto',
    height: tooltipShape === 'circular' ? `${tooltipHeight}px` : 'auto',
    minWidth: tooltipShape === 'circular' ? 'auto' : `${tooltipWidth}px`,
    minHeight: tooltipShape === 'circular' ? 'auto' : `${tooltipHeight}px`,
    top: `${buttonSize/2 - tooltipHeight/2 - dragDistance}px`
  };

  // Additional connector line styles for left/right positioning
  const connectorStyle = {
    backgroundColor: tooltipBackgroundColor
  };

  if (tooltipPosition === 'left') {
    connectorStyle.height = '2px';
    connectorStyle.width = '10px';
    connectorStyle.right = '100%';
    connectorStyle.top = `${buttonSize/2 - dragDistance}px`;
  } else { // right
    connectorStyle.height = '2px';
    connectorStyle.width = '10px';
    connectorStyle.left = '100%';
    connectorStyle.top = `${buttonSize/2 - dragDistance}px`;
  }

  return (
    <div 
      ref={containerRef}
      className={`drag-button-container ${isDragging ? 'dragging' : ''} ${className}`}
      style={containerStyle}
    >
      {/* Background showing drag bounds */}
      <div className="drag-background" style={backgroundStyle}></div>
      
      {/* Button element */}
      <div
        ref={buttonRef}
        className={`drag-button ${isDragging ? 'dragging' : ''}`}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {label}
      </div>
      
      {/* Connector line */}
      <div className="drag-connector" style={connectorStyle}></div>
      
      {/* Tooltip */}
      <div 
        className={`drag-tooltip ${tooltipShape} ${tooltipPosition}`} 
        style={tooltipStyle}
      >
        {calculateValue()}
      </div>
    </div>
  );
};

DragButton.propTypes = {
  // Button content/appearance
  label: PropTypes.node,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  activeBackgroundColor: PropTypes.string,
  tooltipBackgroundColor: PropTypes.string,
  tooltipTextColor: PropTypes.string,
  tooltipShape: PropTypes.oneOf(['rounded', 'circular']),
  tooltipPosition: PropTypes.oneOf(['left', 'right']),
  
  // Sizing
  buttonSize: PropTypes.number,
  tooltipWidth: PropTypes.number,
  tooltipHeight: PropTypes.number,
  
  // Behavior
  maxDragDistance: PropTypes.number,
  
  // Value configuration
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  valueFormat: PropTypes.oneOf(['percentage', 'value', 'custom']),
  customValueFormatter: PropTypes.func,
  
  // Events
  onRelease: PropTypes.func,
  onClick: PropTypes.func,
  
  // Additional styling
  className: PropTypes.string,
  style: PropTypes.object,
};

export default DragButton;