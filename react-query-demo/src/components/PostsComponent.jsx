import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css'; // optional styling

// Fetcher function – fetches posts from JSONPlaceholder
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // useQuery hook – manages fetching, caching, states
  const {
    data: posts,
    isLoading,
    error,
    refetch,        // function to manually refetch
    isFetching,     // true during any fetch (including background)
  } = useQuery({
    queryKey: ['posts'],           // unique key for this query
    queryFn: fetchPosts,           // function that returns data
    staleTime: 5000,               // data considered fresh for 5 seconds
    cacheTime: 10 * 60 * 1000,     // keep inactive data for 10 minutes
  });

  // Loading state – while first fetch is happening
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state – if fetch fails
  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading posts</h3>
        <p>{error.message}</p>
        <button onClick={refetch} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Success state – display the posts
  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts from JSONPlaceholder</h2>
        <div className="header-actions">
          {isFetching && <span className="refreshing">Refreshing...</span>}
          <button onClick={refetch} className="refetch-btn" disabled={isFetching}>
            Refresh Data
          </button>
        </div>
      </div>
      <p className="posts-count">Total posts: {posts.length}</p>
      <div className="posts-grid">
        {posts.slice(0, 10).map((post) => ( // show first 10 for brevity
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;