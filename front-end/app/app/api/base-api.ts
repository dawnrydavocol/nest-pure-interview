import axios from 'axios';

const BASE_URL = 'http://localhost:5176'; // Replace with your actual base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;
