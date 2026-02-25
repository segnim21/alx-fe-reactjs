import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // ✅ Import the custom hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // ✅ useAuth hook is used here
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="auth-loading">Checking authentication...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;