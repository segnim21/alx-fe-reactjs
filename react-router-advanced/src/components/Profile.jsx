import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import the hook

// Sub-components for nested routes
const ProfileDetails = () => {
  const { user } = useAuth();
  const username = user?.username || 'User';
  
  return (
    <div className="profile-details">
      <h3>Profile Details</h3>
      <div className="info-card">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {username}@example.com</p>
        <p><strong>Member since:</strong> January 2024</p>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState('light');

  return (
    <div className="profile-settings">
      <h3>Settings</h3>
      <div className="settings-form">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable email notifications
          </label>
        </div>
        
        <div className="setting-item">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System default</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main Profile component
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Use the hook
  const username = user?.username || 'User';

  const handleLogout = () => {
    logout(); // Use the logout function from hook
    navigate('/login');
  };

  return (
    <div className="profile-container">
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
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;