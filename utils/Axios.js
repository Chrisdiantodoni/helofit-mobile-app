import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = REACT_APP_BASE_URL;
// const token = AsyncStorage.getItem('token');
// console.log(token);
<<<<<<< HEAD
const baseUrl = 'http://172.30.240.1:3002/api/v1/client';
=======
// const baseUrl = 'http://192.168.100.59:3002/api/v1/client';
const baseUrl = 'http://192.168.1.7:3002/api/v1/client';
>>>>>>> 212c97c4a0853bd65f61f6ed7e223ebe6a41a04c

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  // responseType: 'json',
  // withCredentials: true,
});

instance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default instance;
