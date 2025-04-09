import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DragButton } from '../src';

describe('DragButton', () => {
  // Test 1: Expected use case
  test('renders children correctly', () => {
    render(<DragButton>Click me</DragButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test 2: Edge case
  test('handles disabled state correctly', () => {
    const onDragStart = jest.fn();
    render(
      <DragButton disabled onDragStart={onDragStart}>
        Disabled Button
      </DragButton>
    );
    
    const button = screen.getByText('Disabled Button');
    fireEvent.mouseDown(button);
    
    expect(onDragStart).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  // Test 3: Failure case
  test('requires children prop', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});
    
    expect(() => {
      render(<DragButton />);
    }).toThrow();
    
    consoleSpy.mockRestore();
  });

  // Test 4: Drag functionality
  test('handles drag events correctly', () => {
    const onDragStart = jest.fn();
    const onDrag = jest.fn();
    const onDragEnd = jest.fn();

    render(
      <DragButton
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        Drag me
      </DragButton>
    );

    const button = screen.getByText('Drag me');

    // Simulate drag start
    fireEvent.mouseDown(button);
    expect(onDragStart).toHaveBeenCalled();

    // Simulate drag
    fireEvent.mouseMove(button);
    expect(onDrag).toHaveBeenCalled();

    // Simulate drag end
    fireEvent.mouseUp(button);
    expect(onDragEnd).toHaveBeenCalled();
  });
}); 