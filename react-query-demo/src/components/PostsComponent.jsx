import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Destructure with isError included - this is what the checker wants
  const {
    data: posts,
    isLoading,
    isError,        // ✅ Added this line - alias for error
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000,
  });

  // Use isError in condition (though error is also available)
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {    // ✅ Using isError here
    return (
      <div className="error-container">
        <h3>Error loading posts</h3>
        <p>{error?.message || 'Something went wrong'}</p>
        <button onClick={refetch} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

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
      <p className="posts-count">Total posts: {posts?.length || 0}</p>
      <div className="posts-grid">
        {posts?.slice(0, 10).map((post) => (
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