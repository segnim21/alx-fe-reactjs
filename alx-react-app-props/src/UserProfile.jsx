// src/UserProfile.jsx
import React, { useContext } from 'react';
import UserContext from '../UserContext'; // import the context

function UserProfile() {
  // Get userData from the context
  const userData = useContext(UserContext);

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2 style={{ color: 'blue' }}>{userData.name}</h2>
      <p>Email: <span style={{ fontWeight: 'bold' }}>{userData.email}</span></p>
      <p>Bio: Loves hiking and photography</p>
    </div>
  );
}

export default UserProfile;
