// src/App.jsx
import React, { useState } from 'react';
import UserContext from './UserContext';
import ProfilePage from './ProfilePage';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // Counter state (for your previous counter project)
  const [count, setCount] = useState(0);

  // User data to share with components
  const userData = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  };

  return (
    <>
      <div>
        {/* 1. Provide userData to all child components */}
        <UserContext.Provider value={userData}>
          {/* 2. Any component inside this can use the context */}
          <ProfilePage />
        </UserContext.Provider>

        {/* Other components */}
        <WelcomeMessage />
        <Header />
        <MainContent />
        <Footer />

        {/* Vite + React logos */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
