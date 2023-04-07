import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
let token = AsyncStorage.getItem('token') || '';

// const baseUrl = REACT_APP_BASE_URL;
const baseUrl = 'http://192.168.231.118:3002/api/v1/client';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  // responseType: 'json',
  // withCredentials: true,
});

instance.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${token ?? ''}`;
  return config;
});

export default instance;
