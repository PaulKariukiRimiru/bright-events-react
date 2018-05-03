const initialState = {
  activeCalls: 0,
  user: {},
  events: [],
  userEvents: [],
  rsvps: [],
  userRsvps: [],
  loggedin: false,
  fetched: {
    status: false,
    message: ''
  },
  fetching: false,
  errored: {
    status: false,
    message: ''
  },
  messages: []
};
export default initialState;
