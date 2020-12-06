import {
  GET_DATA_FULFILLED,
  UPDATE_COUNT_FULFILLED,
} from './constants.js';

const initialState = {
  count: 0,
  data: [],
};

const dataReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_DATA_FULFILLED: {
      return {
        ...state,
        data: action.payload.results
      };
    }

    case UPDATE_COUNT_FULFILLED: {
      return {
        ...state,
        count: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;