import axios from "axios";

const GITHUB_API_URL ='https://api.github.com';

const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export default fetchUserData = async (username) => {
    try {
        const response = await axios.get(`$GITHUB_API_URL/users/${username}`,
            {
                headers: API_KEY ? {Authorization: `token ${API_KEY}`} : {}
            }
        );

        return response.data;
    }
     catch (error) {
        throw new Error('User not found');
     }
     
};
