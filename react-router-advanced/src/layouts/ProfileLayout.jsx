import { Link, Outlet, useNavigate } from 'react-router-dom';

const ProfileLayout = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="profile-layout">
      <div className="profile-sidebar">
        <h2>Welcome, {username}!</h2>
        <nav className="profile-nav">
          <ul>
            <li><Link to="/profile/details">Profile Details</Link></li>
            <li><Link to="/profile/settings">Settings</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <div className="profile-content">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;