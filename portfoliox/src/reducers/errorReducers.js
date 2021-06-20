import { LOGIN_ERROR, REGISTER_ERROR } from "../actions/types";

const initialState = {
  loginError: {},
  isLoginError: false,
  registerError: {},
  isRegisterError: false,
};

export default function errorReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: payload,
        registerError: {},
        isRegisterError: false,
        isLoginError: true,
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerError: payload,
        loginError: {},
        isRegisterError: true,
        isLoginError: false,
      }
    }
    default:
      return state;
  }
}