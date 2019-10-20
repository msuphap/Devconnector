import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save the token to localstorage
      const {token} = res.data;
      localStorage.setItem('jwtToken', token)
      //set token to auth header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Store user data in redux
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  //Remove token from localstorage
  localStorage.removeItem('jwtToken');
  //Remove token from auth header
  setAuthToken(false);
  //clear the user from redux store
  dispatch(setCurrentUser({}));
}