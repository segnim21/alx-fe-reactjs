import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user tried to visit before login
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple authentication - in real app, this would be an API call
    if (username && password) {
      // Store auth token (simplified)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      
      // Redirect to the page they tried to visit, or profile
      navigate(from, { replace: true });
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Demo credentials: any username/password works</p>
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