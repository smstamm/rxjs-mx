import {
  POLL_ADVICE_FULFILLED,
  POLL_ADVICE_START,
  POLL_ADVICE_STOP,
  UPDATE_FREQUENCY_FULFILLED,
} from './constants.js';

const initialState = {
  advice: '',
  frequency: 1,
  isPolling: false,
};

const adviceReducer = (state = initialState, action) => {

  switch (action.type) {
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

    case UPDATE_FREQUENCY_FULFILLED: {
      return {
        ...state,
        frequency: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default adviceReducer;