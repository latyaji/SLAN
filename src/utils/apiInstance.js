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















// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { store } from '../store/Store';

// const Api = axios.create({
//   baseURL: 'https://dev-slansports.azurewebsites.net/'
// });

// Api.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getToken();
//     if (token) {
//       config.headers.Authorization = 'Bearer ' + token;
//     }
//     store.dispatch(setIsLoading(true));
//     return config;
//   },
//   error => {
//     store.dispatch(setIsLoading(false));
//     return Promise.reject(error);
//   }
// );

// Api.interceptors.response.use(
//   res => {
//     if (res.status >= 200 && res.status < 300) {
//       store.dispatch(setIsLoading(false));
//       return res.data; // Return only the data for convenience
//     }
//     store.dispatch(setIsLoading(false));
//     return res;
//   },
//   async error => {
//     store.dispatch(setIsLoading(false));
//     if (error.message === 'Network Error') {
//       if (error.response?.status === 504) {
//         throw {
//           message: 'Something went wrong. Please try again later.',
//         };
//       } else {
//         throw {
//           message: 'You are not connected to the internet. Verify your connection and then try again.',
//         };
//       }
//     }
    
//     if (error.response) {
//       const status = error.response.status;
//       switch (status) {
//         case 500:
//           throw {
//             message: error?.response?.data?.error || 'Something went wrong. Please try again later.',
//           };
//         case 401:
//           await LocalStorage.LocalStorageLogOut(); // Handle logout logic
//           break;
//         case 403:
//           // Redirect user or show a message
//           break;
//         case 404:
//           throw {
//             message: 'Something went wrong. Please try again later.',
//           };
//         default:
//           throw {
//             ...error.response.data,
//             statusCode: status,
//           };
//       }
//     }
//     throw {
//       message: 'Something went wrong. Please try again later.',
//     };
//   }
// );

// export default Api;
