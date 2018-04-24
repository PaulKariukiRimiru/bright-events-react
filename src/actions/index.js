import { FETCHING, FETCHED, ERRORED, MESSAGE, DISPLAYED } from '../Constants/action_type';

export function fetch(payload) {
  return ({ type: FETCHING, payload });
}

export const fetching = (payload) => ({type: FETCHING, payload: payload});

export const fetched = (status, message) => ({
    type: FETCHED,
    payload: {
      status: status,
      message: message
    }
  });

export const errored = (status, message) => ({
    type: ERRORED,
    payload: {
      status: status,
      message: message
    }
  });

const dismissMessage = (payload) => ({type: DISPLAYED});

export const dismissMessageAction = () => function (dispatch) {
    dispatch(dismissMessage());
  };

const displayMessage = (payload) => ({type: MESSAGE, payload: payload});

export const displayMessageAction = (message) => function (dispatch) {
    dispatch(displayMessage(message))
  };

export function fetchingAction(status) {
  return function (dispatch) {
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
  };
}
