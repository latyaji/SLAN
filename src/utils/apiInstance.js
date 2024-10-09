import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://dev-slansports.azurewebsites.net/', // Set your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here
    // e.g., add authentication tokens
    // const token = getToken(); // get your token
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
apiInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here if needed
    return response;
  },
  (error) => {
    // Handle response error
    console.error('Response Error: ', error.message);
    return Promise.reject(error);
  }
);

export default apiInstance;
