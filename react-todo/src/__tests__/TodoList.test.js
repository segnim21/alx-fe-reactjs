import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  
  // Test 1: Initial render with demo todos
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered (must have IDs 1, 2, 3)
    expect(screen.getByTestId('todo-text-1')).toHaveTextContent('Learn React');
    expect(screen.getByTestId('todo-text-2')).toHaveTextContent('Build a Todo App');
    expect(screen.getByTestId('todo-text-3')).toHaveTextContent('Write tests');
    
    // Check if the input field and button are present
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if new todo appears in the list
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if stats updated
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    expect(screen.getByText('Pending: 3')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input.value).toBe('');
  });

  // Test 3: Does not add empty todo
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Total should still be 3
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  // Test 4: Toggling todo completion
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get the first todo text element (ID 1)
    const todoText = screen.getByTestId('todo-text-1');
    const todoItem = screen.getByTestId('todo-item-1');
    
    // Initially not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should now be completed
    expect(todoItem).toHaveClass('completed');
    
    // Check stats updated (Write tests was already completed)
    expect(screen.getByText('Completed: 2')).toBeInTheDocument();
    expect(screen.getByText('Pending: 1')).toBeInTheDocument();
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // Should not be completed again
    expect(todoItem).not.toHaveClass('completed');
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
  });

  // Test 5: Deleting a todo
  test('deletes todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    
    // Click delete
    fireEvent.click(deleteButton);
    
    // Todo should no longer be in the document
    expect(screen.queryByTestId('todo-text-1')).not.toBeInTheDocument();
    
    // Check stats updated
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument(); // Write tests still there
    expect(screen.getByText('Pending: 1')).toBeInTheDocument(); // Build a Todo App still there
  });

  // Test 6: Multiple operations
  test('handles multiple todo operations correctly', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'Integration Test' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Integration Test')).toBeInTheDocument();
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    
    // Toggle the new todo (it will have a large ID from Date.now())
    // We need to find it by text since we don't know its ID
    const newTodoText = screen.getByText('Integration Test');
    fireEvent.click(newTodoText);
    
    // Find its parent li to check class
    const newTodoItem = newTodoText.closest('li');
    expect(newTodoItem).toHaveClass('completed');
    
    // Delete the new todo
    // Find all delete buttons and click the last one
    const deleteButtons = screen.getAllByTestId(/delete-button/);
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    
    // New todo should be gone
    expect(screen.queryByText('Integration Test')).not.toBeInTheDocument();
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });
});