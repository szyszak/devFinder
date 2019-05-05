import * as actionTypes from "../actions/actionTypes";

const initialState = {
  publicData: [],
  adminData: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // PUBLIC
    case actionTypes.GET_USERS:
      return {
        ...state,
        publicData: [...action.payload]
      };

    // ADMIN
    case actionTypes.GET_USERS_ADMIN:
      return {
        ...state,
        adminData: [...action.payload]
      };

    case actionTypes.ADD_USER:
      return {
        ...state,
        adminData: state.adminData.concat(action.payload)
      };

    case actionTypes.REMOVE_USER:
      return {
        ...state,
        adminData: state.adminData.filter(user => user._id !== action.payload)
      };

    default:
      return state;
  }
};

export default usersReducer;
