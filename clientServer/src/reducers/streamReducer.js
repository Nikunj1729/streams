import omit from "lodash/omit";
import mapKeys from "lodash/mapKeys";
import {
  EDIT_STREAM,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payLoad.id]: action.payLoad };
    case DELETE_STREAM:
      return omit(state, action.payLoad);
    case FETCH_STREAMS:
      return { ...state, ...mapKeys(action.payLoad, "id") };
    default:
      return state;
  }
};

export default streamReducer;
