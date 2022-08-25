import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  USER_INFO,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from "../actions/auth";

const initialState = {
  userInfo: null,
  loginRequest: false,
  loginFailed: false,

  userIsLoaded: false,

  logoutData: null,
  logoutRequest: false,
  logoutFailed: false,

  userInfoRequest: false,
  userInfoFailed: false,

  registerRequest: false,
  registerFailed: false,
};

export const getUserInfo = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        registerRequest: true,
      };
    }

    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        registerRequest: false,
      };
    }

    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }

    case USER_INFO: {
      return {
        ...state,
        userInfoRequest: true,
      };
    }

    case USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        userInfoRequest: false,
        userIsLoaded: true,
      };
    }

    case USER_INFO_FAILED: {
      return {
        ...state,
        userInfoFailed: true,
        userInfoRequest: false,
        userIsLoaded: true,
      };
    }

    case LOGIN_USER: {
      return {
        ...state,
        loginRequest: true,
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        loginRequest: false,
      };
    }

    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        userIsLoaded: false,
        userInfo: null,
      };
    }

    default: {
      return state;
    }
  }
};
