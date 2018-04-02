import { FETCHING, FETCHED, ERRORED, MESSAGE, DISPLAYED } from '../Constants/action_type';

export function fetch(payload){
  return({type: FETCHING, payload:payload});
}

export const fetching = (payload) => {
  return({type: FETCHING, payload:payload});
};

export const fetched = (status, message) => {
  return({type: FETCHED, payload:{status: status, message: message}});
};

export const errored = (status, message) => {
  return({type: ERRORED, payload:{status: status, message: message}});
};

const dismissMessage = payload => {
  return({type: DISPLAYED});
};

export const dismissMessageAction = () => {
  return function(dispatch){
    dispatch(dismissMessage());
  };
};

const displayMessage = payload => {
  return({type: MESSAGE, payload: payload});
};

export const displayMessageAction = (message) => {
  return function(dispatch){
    dispatch(displayMessage(message))
  };
};

export function fetchingAction(status){
  return function (dispatch) {
    dispatch(fetching(status))
  };
};

export function fetchedAction(status, message){
  return (dispatch) => {
    dispatch(displayMessage({status:status, message:message}))
    dispatch(fetched(status, message));
  };
};

export function erroredAction(payload){
  return (dispatch) => {
    dispatch(displayMessage({status:true, message:payload}))
    dispatch(errored(payload.success, payload.message));
  };
};
