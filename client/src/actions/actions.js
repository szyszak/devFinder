import jwt_decode from "jwt-decode";
import * as actionTypes from "./actionTypes";

// HELPER FUNCTIONS
const convertToFormData = data => {
  const formData = new FormData();

  for (let key in data) {
    if (key === "skills") {
      formData.append("skills", JSON.stringify(data[key]));
    } else if (key === "location") {
      formData.append("location", JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
};

// PUBLIC ACTIONS
export const getUsers = () => {
  return dispatch => {
    fetch(`/users`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: actionTypes.GET_USERS, payload: data });
      });
  };
};

// ADMIN ACTIONS
export const getUsersAdmin = token => {
  return dispatch => {
    fetch(`/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: actionTypes.GET_USERS_ADMIN, payload: data });
      })
      .catch(err => console.error(err));
  };
};

export const addUser = (userData, token) => {
  const formData = convertToFormData(userData);
  // for debugging
  // for (let pair of formData.entries()) {
  //   console.log(`formData pair: ${pair}`);
  // }

  return dispatch => {
    fetch(`/admin/users`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: actionTypes.ADD_USER,
          payload: data
        });
      })
      .catch(err => console.error(err));
  };
};

export const removeUser = (userId, token) => {
  return dispatch => {
    fetch(`/admin/users/${userId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: actionTypes.REMOVE_USER,
          payload: response.id
        });
      })
      .catch(err => console.error(err));
  };
};

// AUTH ACTIONS
export const logIn = userData => {
  return dispatch => {
    fetch(`/admin/login`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const decoded = jwt_decode(data.token);
        const adminData = {
          token: data.token,
          login: decoded.login
        };

        dispatch({ type: actionTypes.LOGIN, payload: adminData });
      })
      .catch(err => console.error(JSON.stringify(err)));
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch({ type: actionTypes.LOGOUT });
  };
};
