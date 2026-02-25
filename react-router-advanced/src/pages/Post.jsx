import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockPosts = {
  1: { title: 'Getting Started with React', content: 'React is a JavaScript library for building user interfaces...', author: 'John Doe' },
  2: { title: 'Advanced Routing in React', content: 'React Router provides powerful routing capabilities...', author: 'Jane Smith' },
  3: { title: 'State Management with Context', content: 'Context API allows you to share state across components...', author: 'Bob Johnson' },
};

const Post = () => {
  const { postId } = useParams(); // Get the dynamic parameter from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setPost(mockPosts[postId] || null);
      setLoading(false);
    }, 500);
  }, [postId]); // Re-run when postId changes

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Post Not Found</h2>
        <p>The post with ID "{postId}" does not exist.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="post-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <article className="post">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>Post ID: {postId}</span>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </article>
    </div>
  );
};

export default Post;