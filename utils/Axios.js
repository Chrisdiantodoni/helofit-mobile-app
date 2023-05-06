import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseUrl = REACT_APP_BASE_URL;
// const token = AsyncStorage.getItem('token');
// console.log(token);
const baseUrl = 'http://192.168.237.121:3002/api/v1/client';

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
