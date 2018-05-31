import { FETCHING, FETCHED, ERRORED, MESSAGE, DISPLAYED } from '../Constants/action_type';

const initialState = {
  fetched: {
    status: false,
    message: ''
  },
  fetching: false,
  errored: {
    status: false,
    message: ''
  },
  message: {
    status: false,
    message: ''
  }
};
/**
 * transaction reducer handles the transaction of active calls
 * @param  {any} [state=initialState]
 * @param  {any} action
 * @return {Object} state
 */
const TransacionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetching: true
      };
    case FETCHED:
      return {
        ...state,
        fetching: false,
        fetched: {
          ...state.fetched,
          status: true,
          message: action.payload
        },
        errored: {
          ...state.errored,
          status: false,
          message: ''
        }
      };
    case ERRORED:
      return {
        ...state,
        fetched: {
          ...state.fetched,
          status: false,
          message: ''
        },
        fetching: false,
        errored: {
          ...state.errored,
          status: true,
          message: action.payload
        }
      };
    case MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          status: true,
          message: action.payload.message
        }
      };
    case DISPLAYED:
      return {
        ...state,
        message: {
          ...state.message,
          status: false,
          message: ''
        }
      };
    default:
      return state;
  }
};

export default TransacionReducer;
