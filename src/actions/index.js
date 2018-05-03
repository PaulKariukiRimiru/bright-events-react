import { FETCHING, FETCHED, ERRORED, MESSAGE, DISPLAYED } from '../Constants/action_type';

export function fetch(payload) {
  return ({ type: FETCHING, payload });
}

export const fetching = payload => ({ type: FETCHING, payload });

export const fetched = (status, message) => ({
  type: FETCHED,
  payload: {
    status,
    message
  }
});

export const errored = (status, message) => ({
  type: ERRORED,
  payload: {
    status,
    message
  }
});

const dismissMessage = payload => ({ type: DISPLAYED });

export const dismissMessageAction = () => (dispatch) => {
  dispatch(dismissMessage());
};

const displayMessage = payload => ({ type: MESSAGE, payload });

export const displayMessageAction = message => (dispatch) => {
  dispatch(displayMessage(message));
};

export function fetchingAction(status) {
  return (dispatch) => {
    dispatch(fetching(status));
  };
}

export function fetchedAction(status, message) {
  return (dispatch) => {
    dispatch(displayMessage({ status, message }));
    dispatch(fetched(status, message));
  };
}

export function erroredAction(payload) {
  return (dispatch) => {
    dispatch(displayMessage({ status: true, message: payload }));
    dispatch(errored(true, payload));
  };
}
