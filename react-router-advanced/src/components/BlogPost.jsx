import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Mock data for blog posts
const blogPosts = {
  1: { title: 'Getting Started with React', content: 'React is a JavaScript library for building user interfaces...', author: 'John Doe', date: '2024-01-15' },
  2: { title: 'Advanced Routing in React', content: 'React Router provides powerful routing capabilities for single-page applications...', author: 'Jane Smith', date: '2024-02-20' },
  3: { title: 'State Management with Context', content: 'The Context API allows you to share state across components without prop drilling...', author: 'Bob Johnson', date: '2024-03-10' },
};

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic parameter from URL (named 'id' to match /blog/:id)
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setPost(blogPosts[id] || null);
      setLoading(false);
    }, 500);
  }, [id]); // Re-run when id changes

  if (loading) {
    return <div className="loading">Loading blog post...</div>;
  }

  if (!post) {
    return (
      <div className="not-found">
        <h2>Blog Post Not Found</h2>
        <p>The blog post with ID "{id}" does not exist.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      <article className="blog-post">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>Published: {post.date}</span>
          <span>Post ID: {id}</span>
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

export default BlogPost;