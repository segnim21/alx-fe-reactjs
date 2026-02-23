import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

// Single user lookup (used to get full details after search)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {}
    });
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

// Advanced search with multiple criteria
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  const queryParts = [];
  if (username) queryParts.push(username);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join('+');

  try {
    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: {
        q: query,
        page,
        per_page: 10
      },
      headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {}
    });
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};