import {
  ADD_MATCH,
  GET_MATCHES,
  GET_MATCH,
  UPDATE_MATCH,
  UPDATE_MATCH_BETTING,
  DELETE_MATCH,
  MATCH_LOADING,
  IMPORT_MATCHES
} from "../actions/types";

const initialState = {
  matches: [],
  match: {},
  imports: false,
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
        matches: [
          action.payload,
          ...state.matches.filter(match => match._id !== action.payload._id)
        ]
      };
    case UPDATE_MATCH_BETTING:
      return {
        ...state,
        matches: [
          action.payload,
          ...state.matches.filter(match => match._id !== action.payload._id)
        ]
      };
    case DELETE_MATCH:
      return {
        ...state,
        matches: [
          ...state.matches.filter(match => match._id !== action.payload)
        ]
      };
    case IMPORT_MATCHES:
      return{
        ...state,
        imports: action.payload
      }
    default:
      return state;
  }
}
