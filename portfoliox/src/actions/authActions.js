import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { LOGIN_ERROR, REGISTER_ERROR, SET_CURRENT_USER, USER_LOADING } from "./types";
import * as loginService from '../services/auth';

// Register User
export function registerUserAction(userData) {
  return async (dispatch) => {
    try {
      await loginService.registerUserService(userData);
    } catch (e) {
      dispatch({ type: REGISTER_ERROR, payload: e.response.data.error })
    }
  }
}

export function disableLoginError() {
  return async (dispatch) => {
    dispatch({ type: LOGIN_ERROR, payload: {}})
  }
}

// Login - get user token
export function loginUser(userData) {
  return async (dispatch) => {
    try {
        const data  = await loginService.loginUserService(userData);
        localStorage.setItem("jwtToken", data.token);
        setAuthToken(data.token)
        const decoded = jwt_decode(data.token);
        dispatch({ type: SET_CURRENT_USER, payload: decoded })
    } catch (e) {
      dispatch({ type: LOGIN_ERROR, payload: e.response.data.error})
    }
  }
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};