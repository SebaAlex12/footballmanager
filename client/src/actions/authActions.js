import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import history from "../history";

//  Register User

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login get user token

export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;
      // set Token to localstorage
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //Remove token fromlocalstorage
  localStorage.removeItem("jwtToken");
  // remove outh header
  setAuthToken(false);
  // set current user to empty object
  dispatch(setCurrentUser({}));
  history.push("/login");
};
