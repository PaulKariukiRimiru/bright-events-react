import { FETCHING, FETCHED, AUTHENTICATE, REGISTER } from '../Constants/action_type';

const initialState = {
  fetching,
  fetched,
  auth : {}
}

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return
    case FETCHED:
      return
    case AUTHENTICATE:
      return
    case REGISTER:
      return 
    default:
      return state
  }
}