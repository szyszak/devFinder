import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  login: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        login: action.payload.login,
        token: action.payload.token
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        login: null,
        token: null
      };

    default:
      return state;
  }
};

export default authReducer;
