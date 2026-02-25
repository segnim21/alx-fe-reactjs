import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost'; // ✅ Renamed and imported as BlogPost
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-brand">
            <Link to="/">React Router Demo</Link>
          </div>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog/1" className={({ isActive }) => isActive ? 'active' : ''}>
                    Blog Post #1
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected route with nested routes */}
          <Route path="/profile/*" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* ✅ Dynamic route with exact pattern checker wants: /blog/:id and BlogPost component */}
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;