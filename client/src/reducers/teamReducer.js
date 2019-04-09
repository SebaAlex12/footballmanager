import {
  ADD_TEAM,
  GET_TEAMS,
  GET_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  TEAM_LOADING
} from "../actions/types";

const initialState = {
  teams: [],
  team: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        loading: false
      };
    case GET_TEAM:
      return {
        ...state,
        team: action.payload,
        loading: false
      };
    case ADD_TEAM:
      return {
        ...state,
        teams: [action.payload, ...state.teams]
      };
    case UPDATE_TEAM:
      return {
        ...state,
        teams: [
          action.payload,
          ...state.teams.filter(match => match._id !== action.payload._id)
        ]
      };
    case DELETE_TEAM:
      return {
        ...state,
        teams: [...state.teams.filter(team => team._id !== action.payload)]
      };
    default:
      return state;
  }
}
