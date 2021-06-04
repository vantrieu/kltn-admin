import { history } from './history';
import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/Account/actions';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/
api.interceptors.response.use(
  (res) => {
    if(res.data.status === 403){
      store.dispatch(logout());
      history.push('/');
    }
    return res
  }, (err) => {
    if (err.response.status === 401) {
      //todo
    }
    return Promise.reject(err);
  }
);

export { api };