import { useState } from 'react';
import UserContext from './UserContext';
import ProfilePage from './ProfilePage';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const userData = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  };

  return (
    <>
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>

      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />

      <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
      />

      <div>
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
      </div>
    </>
  );
}

export default App;
