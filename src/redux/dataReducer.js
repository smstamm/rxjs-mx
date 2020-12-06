import {
  UPDATE_COUNT,
  GET_DATA,
} from './constants.js';

const initialState = {
  count: 0,
  data: [],
};

const dataReducer = (state = initialState, action) => {

  switch (action.type) {

    case UPDATE_COUNT: {
      return {
        ...state,
        count: parseInt(action.payload)
      };
    }

    case GET_DATA: {
      return {
        ...state,
        data: action.payload.results
      };
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;