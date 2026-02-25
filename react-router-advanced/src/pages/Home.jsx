import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Advanced Routing Demo</h1>
      <p>This application demonstrates nested routes, dynamic routing, and protected routes.</p>
      
      <div className="demo-links">
        <h2>Try these features:</h2>
        <ul>
          <li><Link to="/profile">Go to Profile (Protected)</Link></li>
          <li><Link to="/blog/1">Read Blog Post #1 (Dynamic Route)</Link></li>
          <li><Link to="/blog/2">Read Blog Post #2 (Dynamic Route)</Link></li>
          <li><Link to="/blog/3">Read Blog Post #3 (Dynamic Route)</Link></li>
          <li><Link to="/blog/999">Try Non-existent Blog Post</Link></li>
          <li><Link to="/login">Login Page</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;