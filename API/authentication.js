import {Axios} from '../utils';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';

class authenticationAPI {
  login({body}) {
    console.log('login');
    return Axios.post('/authentication/login', body).then(res => res.data);
  }
  register({body}) {
    return Axios.post('/authentication/register', body)
      .then(res => res.data)
      .catch(err => err);
  }
}

export default new authenticationAPI();
