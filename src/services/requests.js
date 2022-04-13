import axios from 'axios';

// I know I could use 'fetch', but i chose to use 'axios' because it's a very popular tool to make requests
const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || 3001}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
}
