import { useState, useEffect } from 'react';

// Custom hook for authentication
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const username = localStorage.getItem('username');
      
      setIsAuthenticated(authStatus);
      setUser(username ? { username } : null);
      setLoading(false);
    };

    checkAuth();

    // Optional: Listen for storage events (if user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function
  const login = (username, password) => {
    // In a real app, this would be an API call
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
};

export default useAuth;