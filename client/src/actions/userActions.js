import axios from "axios";

import { GET_USER_BY_ID, GET_USERS, GET_ERRORS } from "./types";

// get user by id

export const getUserById = id => dispatch => {
  axios
    .get(`api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_BY_ID,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getUsers = () => dispatch => {
  axios.get('api/users')
  .then(res => dispatch({
    type: GET_USERS,
    payload: res.data
  })
  )
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};