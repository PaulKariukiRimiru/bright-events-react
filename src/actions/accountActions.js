import axios from 'axios';
import { fetchingAction , fetchedAction, erroredAction, displayMessageAction } from '../actions/index';
import { REGISTER_SUCCESS_MESSAGE, LOGIN_SUCCESS_MESSAGE, EVENT_ADDED_SUCCESSFULLY } from '../Constants/messages';
import { LOGIN_SUCCESS, EVENT_POST_SUCCESS, EVENT_GET_SUCCESS, RSVP_GET_SUCCESS, RSVP_MANAGE_SUCCESS, DELETE_EVENT_SUCCESS, EDIT_EVENT_SUCCESS, TOKEN } from '../Constants/action_type';
import { push } from 'react-router-redux';

const loginAction = payload => {
  return({type: LOGIN_SUCCESS, payload: payload});
};

const eventsPostAction = payload => {
  return({type: EVENT_POST_SUCCESS, payload: payload})
}

const eventsGetAction = payload => {
  return({type: EVENT_GET_SUCCESS, payload: payload});
};

const eventRsvpAction = payload => {
  return({type: RSVP_GET_SUCCESS, payload: payload});
};

const eventManageRsvpAction = payload => {
  return({type: RSVP_MANAGE_SUCCESS, payload: payload});
};

const eventDeleteAction = payload => {
  return({type: DELETE_EVENT_SUCCESS, payload: payload});
};

const eventEditAction = payload => {
  return({type: EDIT_EVENT_SUCCESS, payload: payload});
};

export const eventEdit = (id, payload) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  console.log("edit event", payload)
  return function(dispatch){

    axios({
      method: 'put',
      url: 'http://127.0.0.1:5000/api/v2/events/'+id,
      data: payload,
      headers: headers
    })
    .then((resp) => {
      return(dispatch(eventEditAction(resp.data.payload)));
    })
    .catch((error) => {
      if(error.message){
        return(dispatch(erroredAction(error.response.data.message)));
      };
    })
  }
}

export const eventDelete = (eventId) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch) {
    axios({
      method: 'delete',
      headers: headers,
      url: 'http://127.0.0.1:5000/api/v2/events/'+eventId
    })
    .then((resp) => {
      return(dispatch(eventDeleteAction(eventId)));
    })
    .catch((error) => {
      if(error.message){
        return(dispatch(erroredAction(error.response.data.message)));
      };
    })
  }
}

export const eventManageRsvp = payload => {

  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'put',
      url:'http://127.0.0.1:5000/api/v2/event/'+payload+'/rsvp'
    })
    .then((resp) => {
      return(dispatch(eventManageRsvpAction(resp.data.payload)));
    })
    .catch((error) => {
      if(error.message){
        return(dispatch(erroredAction(error.response.data.message)));
      };
    });
  };
};

export const eventRsvp = (event, email) => {

  const clientDetails = {
    client_email: email
  };
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'post',
      url:'http://127.0.0.1:5000/api/v2/event/'+event+'/rsvp',
      data: clientDetails
    })
    .then((resp) => {
      return(dispatch(displayMessageAction({status:true, message:"event reserved successfully"})));
    })
    .catch((error) => {
      if(error.message){
        return(dispatch(erroredAction(error.response.data.message)));
      }
    });
  };
};

export const eventsGet = payload => {
  let message = '';
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios.get("http://127.0.0.1:5000/api/v2/events")
    .then((resp) => {
      return(dispatch(eventsGetAction(resp.data.payload.event_list)))
    })
    .catch((error) => {
      if(error.response){
        message = error.response.data.message
        return(dispatch(erroredAction(error.response.data.message)));
      }
    })
  }
}

export const eventPost = payload => {
  let message = '';
  const eventDetails = {
    name: payload.name,
    location: payload.location,
    category: payload.category,
    time: payload.time,
    host: payload.host
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer '+payload.token,
  }

  return function(dispatch) {

    dispatch(fetchingAction(true))
    axios(
      {
        method:'post',
        url:'http://127.0.0.1:5000/api/v2/events',
        headers: headers,
        data: eventDetails
      }
    )
    .then((resp) => {
      return(dispatch(eventsPostAction(eventDetails)));
    })
    .then(() => {
      return(dispatch(fetchedAction(true, EVENT_ADDED_SUCCESSFULLY)))
    })
    .catch((error) => {
      if(error.response){
        message = error.response.data.message
        return(dispatch(erroredAction(message)));
      }
    })

  }
}

export const registerUser = (payload) => {
  let message = '';
  const userDetails = {
    username : payload.username,
    email: payload.email,
    password: payload.password
  };
  
  return function(dispatch) {
    dispatch(fetchingAction(true))
    axios({method: 'post', url: "http://127.0.0.1:5000/api/v2/auth/register",data: userDetails})
    .then((resp) => {
      message = REGISTER_SUCCESS_MESSAGE;
      return(dispatch(fetchedAction(true, message)));
    })
    .catch((error) => {
      if(error.response){
        message = error.response.data.message
        return(dispatch(erroredAction(error.response.data.message)));
      }
    })
  };
};

export const loginUser = (payload, history) => {
  let message = '';
  const userDetails = {
    email: payload.email,
    password: payload.password
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }

  return function(dispatch) {
    dispatch(fetchingAction(true))
    axios({method: 'post', url: "http://127.0.0.1:5000/api/v2/auth/login", header:headers, data: userDetails})
    .then((resp) =>{ 
      message = LOGIN_SUCCESS_MESSAGE;
      return(
        dispatch(loginAction(resp.data))
      )
    })
    .then(() =>  dispatch(fetchedAction(true, LOGIN_SUCCESS_MESSAGE)))
    // .then(() => history.push('/dashboard'))
    .catch((error) => {
      if(error.response){
        message = error.response.data.message
        return(dispatch(erroredAction(error.response.data.message)));
      }
      console.log(error);
      
    });
    
  };
};

