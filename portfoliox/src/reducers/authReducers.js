import { SET_CURRENT_USER, USER_LOADING, LOGIN_ERROR, REGISTER_ERROR, DISABLE_ERRORS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    loginError: {},
    isLoginError: false,
    registerError: {},
    isRegisterError: false,
};
  
export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        isLoginError: false,
        isRegisterError: false,
    };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        isLoginError: false,
        isRegisterError: false,
    };
    case LOGIN_ERROR: 
      return {
        ...state,
        loginError: payload,
        registerError: {},
        isRegisterError: false,
        isLoginError: true,
      }
    case REGISTER_ERROR: 
      return {
        ...state,
        registerError: payload,
        loginError: {},
        isRegisterError: true,
        isLoginError: false,
      }
    case DISABLE_ERRORS:
      return {
        ...state,
        isLoginError: false,
        isRegisterError: false,
      }
    default:
      return state;
  }
}