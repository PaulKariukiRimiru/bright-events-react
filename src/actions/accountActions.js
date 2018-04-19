import React from 'react';
import axios from 'axios';
import { fetchingAction , fetchedAction, erroredAction, displayMessageAction } from '../actions/index';
import { REGISTER_SUCCESS_MESSAGE, 
        LOGIN_SUCCESS_MESSAGE, 
        EVENT_ADDED_SUCCESSFULLY } from '../Constants/messages';
import { LOGIN_SUCCESS, 
        LOGOUT_SUCCESS, 
        EVENT_POST_SUCCESS, 
        EVENT_GET_SUCCESS, 
        RSVP_GET_SUCCESS, 
        RSVP_MANAGE_FAILED,
        RSVP_MANAGE_SUCCESS, 
        DELETE_EVENT_SUCCESS, 
        EDIT_EVENT_SUCCESS, 
        EVENT_SEARCH,
        TOKEN,
        BASE_URL } from '../Constants/action_type';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router-dom';
const loginAction = payload => {
  return({type: LOGIN_SUCCESS, payload: payload});
};

const logoutAction = payload => {
  return({type: LOGOUT_SUCCESS, payload: payload})
}

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

const rsvpGetFailed = payload => {
  return ({type: RSVP_MANAGE_FAILED});
};

const eventSearchAction = payload => {
  return ({type: EVENT_SEARCH, payload: payload});
};

export const eventSearch = (params={}, body={}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'get',
      url: BASE_URL+'/api/v2/events/search',
      headers: headers,
      params: params,
      body: body
    })
    .then((resp) => {
      return(dispatch(eventSearchAction(resp.data.payload.event_list)))
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }
    })
  }
}

export const eventFilter = (body) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'get',
      url: BASE_URL+'/api/v2/events/search',
      headers: headers,
      body: body
    })
    .then((resp) => {
      return(dispatch(eventSearchAction(resp.data.payload.event_list)))
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }
    })
  }
}

export const eventRsvpGet = (id) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'get',
      url: BASE_URL+'/api/v2/event/'+id+'/rsvp',
      headers: headers
    })
    .then((resp) => {
      return(dispatch(eventRsvpAction(resp.data.payload)));
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(rsvpGetFailed(error.response.data.message)));
      }else{
        return(dispatch(rsvpGetFailed(error.message)));
      }
    });
  }
}

export const eventEdit = (id, payload) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch){

    axios({
      method: 'put',
      url: BASE_URL+'/api/v2/events/'+id,
      data: payload,
      headers: headers
    })
    .then((resp) => {
      return(dispatch(eventEditAction(resp.data.payload)));
    })
    .catch((error) => {
      if(error.response){
        return(
          dispatch(erroredAction(error.response.data.message))
        );
      }else{
        return(dispatch(erroredAction(error.message)));
      }
    })
  }
}

export const eventDelete = (eventId) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }
  return function(dispatch) {
    axios({
      method: 'delete',
      headers: headers,
      url: BASE_URL+'/api/v2/events/'+eventId
    })
    .then((resp) => {
      return(dispatch(eventDeleteAction(eventId)));
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }

    })
  }
}

export const eventManageRsvp = (id, details) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
  }

  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'put',
      headers: headers,
      url: BASE_URL+'/api/v2/event/'+id+'/rsvp',
      data: details
    })
    .then((resp) => {
      return(dispatch(eventManageRsvpAction(resp.data.payload)));
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }
    });
  };
};

export const eventRsvp = (event, email) => {

  const clientDetails = {
    client_email: email
  };

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL
  }

  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      method: 'post',
      url:BASE_URL+'/api/v2/event/'+event+'/rsvp',
      data: clientDetails,
      headers: headers
    })
    .then((resp) => {
      return(dispatch(displayMessageAction({status:true, message:"event reserved successfully"})));
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }
    });
  };
};

export const eventsGet = payload => {
  let message = '';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: localStorage.getItem(TOKEN) ? 'Bearer '+localStorage.getItem(TOKEN): '',
  }
  return function(dispatch){
    dispatch(fetchingAction(true));
    axios({
      url: BASE_URL+'/api/v2/events',
      method: 'get',
      headers: headers
    })
    .then((resp) => {
      return(dispatch(eventsGetAction(resp.data.payload)))
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
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
    'Access-Control-Allow-Origin': BASE_URL,
    Authorization: 'Bearer '+payload.token,
  }

  return function(dispatch) {

    dispatch(fetchingAction(true))
    axios(
      {
        method:'post',
        url: BASE_URL+'/api/v2/events',
        headers: headers,
        data: eventDetails
      }
    )
    .then((resp) => {
      eventDetails.id = resp.data.payload.event_id;
      return(dispatch(eventsPostAction(eventDetails)));
    })
    .then(() => {
      return(dispatch(fetchedAction(true, EVENT_ADDED_SUCCESSFULLY)))
    })
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
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

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL
  }
  
  return function(dispatch) {
    dispatch(fetchingAction(true))
    axios({method: 'post', url: BASE_URL+'/api/v2/auth/register',data: userDetails, headers: headers})
    .then((resp) => {
      message = REGISTER_SUCCESS_MESSAGE;
      return(dispatch(fetchedAction(true, message)));
    })
    .catch((error) => {
      if(!error.response){
        return(dispatch(erroredAction(error.message)));
      }else{
        return(dispatch(erroredAction(error.response.data.message)));
      }
    })
  };
};

export const logoutUser = (payload, history) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer '+localStorage.getItem(TOKEN),
    'Access-Control-Allow-Origin': BASE_URL
  }
  const data = {
    id: payload
  }
  return function(dispatch) {
    dispatch(fetchingAction(true))
    axios({
      method:'post',
      url: BASE_URL+'/api/v2/auth/logout',
      headers: headers,
      data: data
    })
    .then((resp) => {
      localStorage.clear()
      history.push('/')
      return(
        dispatch(logoutAction(resp.data.payload))
      );
    })
    .catch((error) => {
      if(!error.response){
        return(dispatch(erroredAction(error.message)));
      }else{
        return(dispatch(erroredAction(error.response.data.message)));
      }
    })
  }
}

export const loginUser = (payload, history) => {
  let message = '';
  const userDetails = {
    email: payload.email,
    password: payload.password
  };

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL
  }

  return function(dispatch) {
    dispatch(fetchingAction(true))
    axios({method: 'post', url: BASE_URL+'/api/v2/auth/login', header:headers, data: userDetails})
    .then((resp) =>{ 
      message = LOGIN_SUCCESS_MESSAGE;
      return(
        dispatch(loginAction(resp.data))
      )
    })
    .then(() =>  dispatch(fetchedAction(true, LOGIN_SUCCESS_MESSAGE)))
    .catch((error) => {
      if(error.response){
        return(dispatch(erroredAction(error.response.data.message)));
      }else{
        return(dispatch(erroredAction(error.message)));
      }      
    });
    
  };
};

