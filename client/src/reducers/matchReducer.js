import {
  ADD_MATCH,
  GET_MATCHES,
  GET_MATCH,
  UPDATE_MATCH,
  DELETE_MATCH,
  MATCH_LOADING
} from "../actions/types";

const initialState = {
  matches: [],
  match: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MATCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        loading: false
      };
    case GET_MATCH:
      return {
        ...state,
        match: action.payload,
        loading: false
      };
    case ADD_MATCH:
      return {
        ...state,
        matches: [action.payload, ...state.matches]
      };
    case UPDATE_MATCH:
      return {
        ...state,
        maches: [action.payload, ...state.matches]
      };
    case DELETE_MATCH:
      return {
        ...state,
        matches: state.matches.filter(match => match._id !== action.payload)
      };
    default:
      return state;
  }
}
