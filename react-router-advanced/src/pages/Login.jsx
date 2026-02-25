import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Use the login function from hook
  
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Use the login function from the hook
    const success = login(username, password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Demo credentials: any username/password works</p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;