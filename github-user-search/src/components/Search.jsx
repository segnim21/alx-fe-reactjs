import { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

function Search() {
  // Form fields
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  // Results state
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsers([]);
    setTotalCount(0);
    setCurrentPage(1);
    setError(null);

    const criteria = {
      username,
      location,
      minRepos: minRepos ? Number(minRepos) : null,
      page: 1
    };

    setLoading(true);
    try {
      const data = await searchUsers(criteria);
      setTotalCount(data.total_count);
      const basicUsers = data.items;
      setHasMore(basicUsers.length === 10);

      if (basicUsers.length > 0) {
        setLoadingDetails(true);
        const detailPromises = basicUsers.map(user =>
          fetchUserData(user.login).catch(() => null)
        );
        const detailedUsers = await Promise.all(detailPromises);
        const validDetailedUsers = detailedUsers.filter(user => user !== null);
        setUsers(validDetailedUsers);
        setLoadingDetails(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    const criteria = {
      username,
      location,
      minRepos: minRepos ? Number(minRepos) : null,
      page: nextPage
    };

    setLoading(true);
    try {
      const data = await searchUsers(criteria);
      const basicUsers = data.items;
      setHasMore(basicUsers.length === 10);

      setLoadingDetails(true);
      const detailPromises = basicUsers.map(user =>
        fetchUserData(user.login).catch(() => null)
      );
      const detailedUsers = await Promise.all(detailPromises);
      const validDetailedUsers = detailedUsers.filter(user => user !== null);

      setUsers(prev => [...prev, ...validDetailedUsers]);
      setCurrentPage(nextPage);
      setLoadingDetails(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Advanced GitHub User Search</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., john"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., lagos"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minRepos">
            Minimum Repositories
          </label>
          <input
            id="minRepos"
            type="number"
            min="0"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g., 10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Results Count */}
      {totalCount > 0 && (
        <p className="text-gray-600 mb-4">
          Found {totalCount} user{totalCount !== 1 ? 's' : ''}
        </p>
      )}

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 flex items-start space-x-4">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
              {user.location && <p className="text-gray-600 text-sm">📍 {user.location}</p>}
              <p className="text-gray-600 text-sm">📦 Public repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm inline-block mt-2"
              >
                View Profile →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loading details indicator */}
      {loadingDetails && (
        <p className="text-center text-gray-500 mt-4">Loading user details...</p>
      )}

      {/* Load More button */}
      {hasMore && !loading && !loadingDetails && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;