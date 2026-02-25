import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the component title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    
    // Check if the input field and button are present
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check stats
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 1')).toBeInTheDocument();
    expect(screen.getByText('Pending: 2')).toBeInTheDocument();
  });

  // Test 2: Adding Todos
  test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    // Get input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'Test new todo' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if new todo appears in the list
    expect(screen.getByText('Test new todo')).toBeInTheDocument();
    
    // Check if stats updated
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    expect(screen.getByText('Pending: 3')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input.value).toBe('');
  });

  // Test 3: Adding empty todo
  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTotal = screen.getByText('Total: 3');
    
    // Try to add empty todo
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    
    // Total should still be 3
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  // Test 4: Toggling Todos
  test('toggles todo completion status when clicked', () => {
    render(<TodoList />);
    
    // Get the first todo text element
    const todoText = screen.getByTestId('todo-text-1'); // ID 1 is 'Learn React'
    
    // Initially not completed (not having line-through style)
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // After click, it should be completed (but we can't easily test style in JSDOM)
    // Instead, we can check if the parent li has 'completed' class
    const todoItem = todoText.closest('li');
    expect(todoItem).toHaveClass('completed');
    
    // Check stats updated
    expect(screen.getByText('Completed: 2')).toBeInTheDocument();
    expect(screen.getByText('Pending: 1')).toBeInTheDocument();
  });

  // Test 5: Deleting Todos
  test('deletes todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Get delete button for first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    
    // Click delete
    fireEvent.click(deleteButton);
    
    // Todo should no longer be in the document
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check stats updated
    expect(screen.getByText('Total: 2')).toBeInTheDocument();
  });

  // Test 6: Multiple interactions
  test('handles multiple todo operations correctly', () => {
    render(<TodoList />);
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    
    // Toggle the new todo
    const newTodoText = screen.getByText('New Task');
    fireEvent.click(newTodoText);
    
    // Check completed count increased
    expect(screen.getByText('Completed: 2')).toBeInTheDocument();
    
    // Delete the new todo
    // Find the delete button for the new todo (it will have the highest ID)
    const allDeleteButtons = screen.getAllByText('Delete');
    const lastDeleteButton = allDeleteButtons[allDeleteButtons.length - 1];
    fireEvent.click(lastDeleteButton);
    
    // New Task should be gone
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    expect(screen.getByText('Total: 3')).toBeInTheDocument();
  });

  // Test 7: User Event simulation (using userEvent instead of fireEvent)
  test('adds todo using userEvent for more realistic simulation', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type using userEvent
    await user.type(input, 'User Event Todo');
    await user.click(addButton);
    
    expect(screen.getByText('User Event Todo')).toBeInTheDocument();
  });
});