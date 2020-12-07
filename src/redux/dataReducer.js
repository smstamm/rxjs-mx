import {
  GET_DATA_FULFILLED,
  POLL_ADVICE_FULFILLED,
  POLL_ADVICE_START,
  POLL_ADVICE_STOP,
  UPDATE_COUNT_FULFILLED,
} from './constants.js';

const initialState = {
  advice: '',
  count: 0,
  data: [],
  isPolling: false,
};

const dataReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_DATA_FULFILLED: {
      return {
        ...state,
        data: action.payload.results
      };
    }

    case POLL_ADVICE_FULFILLED: {
      return {
        ...state,
        advice: action.payload.response.slip.advice,
      };
    }

    case POLL_ADVICE_START: {
      return {
        ...state,
        isPolling: true,
      }
    }


    case POLL_ADVICE_STOP: {
      return {
        ...state,
        isPolling: false,
      }
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