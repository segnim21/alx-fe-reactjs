import { useState } from 'react';
import PostsComponent from './PostsComponent';

const CacheDemo = () => {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div className="cache-demo">
      <div className="demo-controls">
        <button onClick={() => setShowPosts(!showPosts)}>
          {showPosts ? 'Hide Posts' : 'Show Posts'}
        </button>
        <p>
          Click to unmount and remount the PostsComponent. Watch the network tab –
          after first load, data comes from cache!
        </p>
      </div>
      {showPosts && <PostsComponent />}
    </div>
  );
};

export default CacheDemo;