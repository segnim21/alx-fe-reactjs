const ProfileDetails = () => {
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="info-card">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {username}@example.com</p>
        <p><strong>Member since:</strong> January 2024</p>
      </div>
    </div>
  );
};

export default ProfileDetails;