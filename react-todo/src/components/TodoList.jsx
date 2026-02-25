import { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // Initial state with demo todos - IDs must be 1, 2, 3 exactly
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write tests', completed: true },
  ]);

  const [inputValue, setInputValue] = useState('');

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(), // This will be a large number, not 1,2,3
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      {/* Add Todo Form - MUST have data-testid attributes */}
      <form onSubmit={addTodo} className="todo-form" data-testid="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
          data-testid="todo-input"
        />
        <button type="submit" className="add-btn" data-testid="add-button">
          Add Todo
        </button>
      </form>

      {/* Todo List - MUST have data-testid attributes */}
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            data-testid={`todo-item-${todo.id}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className="todo-text"
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
              data-testid={`delete-button-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <div className="todo-stats" data-testid="todo-stats">
        <p>Total: {todos.length}</p>
        <p>Completed: {todos.filter(t => t.completed).length}</p>
        <p>Pending: {todos.filter(t => !t.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoList;