import { FETCHING, FETCHED, ERRORED, MESSAGE, DISPLAYED } from '../Constants/action_type';
/**
 * fetch action
 * @export
 * @param  {any} payload
 * @return {Object} action
 */
export function fetch(payload) {
  return ({ type: FETCHING, payload });
}
/**
 * fetching action
 * @param  {any} payload
 * @return {void}
 */
const fetching = payload => ({ type: FETCHING, payload });
/**
 * fetched action
 * @param  {any} status
 * @param  {any} message
 * @return {void}
 */
const fetched = (status, message) => ({
  type: FETCHED,
  payload: {
    status,
    message
  }
});
/**
 * errored action
 * @param  {any} status
 * @param  {any} message
 * @return {void}
 */
const errored = (status, message) => ({
  type: ERRORED,
  payload: {
    status,
    message
  }
});
/**
 * dismiss message action
 * @param  {any} payload
 * @return {void}
 */
const dismissMessage = payload => ({ type: DISPLAYED });
/**
 * dismiss message thunk
 * @return {void}
 */
export const dismissMessageAction = () => (dispatch) => {
  dispatch(dismissMessage());
};
/**
 * display messsage action
 * @param  {any} payload
 * @return {void}
 */
const displayMessage = payload => ({ type: MESSAGE, payload });
/**
 * display message thunk
 * @param  {any} message
 * @return {void}
 */
export const displayMessageAction = message => (dispatch) => {
  dispatch(displayMessage(message));
};
/**
 * fetching thunk
 * @export
 * @param  {any} status
 * @return {void}
 */
export function fetchingAction(status) {
  return (dispatch) => {
    dispatch(fetching(status));
  };
}
/**
 * fetched thunk
 * @export
 * @param  {any} status
 * @param  {any} message
 * @return {void}
 */
export function fetchedAction(status, message) {
  return (dispatch) => {
    dispatch(displayMessage({ status, message }));
    dispatch(fetched(status, message));
  };
}
/**
 * errored thunk
 * @export
 * @param  {any} payload
 * @return {void}
 */
export function erroredAction(payload) {
  return (dispatch) => {
    dispatch(displayMessage({ status: true, message: payload }));
    dispatch(errored(true, payload));
  };
}
