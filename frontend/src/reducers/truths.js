import {
  CREATE_TRUTH,
  RETRIEVE_TRUTHS,
  UPDATE_TRUTH,
  DELETE_TRUTH,
  DELETE_ALL_TRUTHS,
} from "../actions/types";

const initialState = [];

function truthReducer(truths = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TRUTH:
      return [...truths, payload];

    case RETRIEVE_TRUTHS:
      return payload;

    case UPDATE_TRUTH:
      return truths.map((truth) => {
        if (truth.id === payload.id) {
          return {
            ...truth,
            ...payload,
          };
        } else {
          return truth;
        }
      });

    case DELETE_TRUTH:
      return truths.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TRUTHS:
      return [];

    default:
      return truths;
  }
};

export default truthReducer;