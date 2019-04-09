import axios from "axios";

import {
  ADD_TEAM,
  GET_TEAM,
  GET_TEAMS,
  UPDATE_TEAM,
  DELETE_TEAM,
  GET_ERRORS
} from "./types";

export const addTeam = teamData => dispatch => {
  axios
    .post("/api/teams", teamData)
    .then(res =>
      dispatch({
        type: ADD_TEAM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTeams = () => dispatch => {
  //dispatch(setPostLoading());
  axios
    .get("/api/teams")
    .then(res =>
      dispatch({
        type: GET_TEAMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TEAMS,
        payload: null
      })
    );
};

// get current team

export const getCurrentTeam = id => dispatch => {
  axios
    .get(`/api/teams/current/${id}`)
    .then(res =>
      dispatch({
        type: GET_TEAM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// update team

export const updateTeam = teamData => dispatch => {
  console.log(teamData);
  axios
    .post(`/api/teams/update/${teamData.id}`, teamData)
    .then(res =>
      dispatch({
        type: UPDATE_TEAM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete team

export const deleteTeam = id => dispatch => {
  axios
    .delete(`/api/teams/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TEAM,
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

//Set loading state

export const setPostLoading = () => {
  return {};
};
