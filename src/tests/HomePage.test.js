import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { beforeEach, afterEach } from 'mocha';

import { NewHome } from '../pages/NewHome';

const setUp = (isMount) => {
  const minProps = {
    user: '',
    fetching: false,
    message: '',
    rsvps: [],
    events: [],
    getEvents: (callBack) => {},
    getUserRsvps: () => {},
    dismissMessage: () => {},
    deleteEvent: (eventId, callBack) => {},
    deleteRsvp: (eventDetails) => {},
    editEvent: (id, eventDetails, callBack) => {},
    fetchRsvps: (id, callBack) => {},
    changeRsvpStatus: (id, statusDetails) => {},
    createEvent: (eventDetails, callBack) => {},
    changeAttendance: (attendanceDetails, callBack) => {},
    rsvpEvent: (eventId, email, callBack) => {},
    loginUser: (userDetails, callBack) => {},
    registerUser: (userDetails, callBack) => {},
    logoutUser: (userId, callBack) => {}
  };
  const state = {
    drawerOpen: false,
    showDialog: true,
    editForm: {},
    form: {
      username: '',
      email: '',
      password: ''
    },
    filterSelection: [],
    view: 'account',
    displayed: 'allEvents',
    title: '',
    events: [],
    location: [],
    category: []
  };
  if (isMount) {
    return mount(<NewHome {...minProps} />).setState(state);
  }
  return shallow(<NewHome {...minProps} />);
};

describe('Component: HomePage', () => {
  let wrapper;
  describe('Render tests', () => {
    beforeEach(() => {
      wrapper = setUp(true);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('Renders an app bar', () => {
      expect(wrapper.find('MyAppBar').exists()).to.be.equal(true);
    });
    it('Renders a swipable drawer', () => {
      wrapper.setState({
        drawerOpen: true
      });
      expect(wrapper.find('SwipeableDrawer').exists()).to.be.equal(true);
    });
    it('Renders an expansion panel', () => {
      
    });
    it('Renders a complete events grid component');
    it('Renders a Dialog component', () => {
      wrapper.setState({
        showDialog: true
      });
      expect(wrapper.find('NewDialog').exists()).to.be.equal(true);
    });
  });
  describe('Events tests', () => {
    it('Displays all events', () => {
      
    });
    it('Displays user events', () => {

    });
    it('Displays user rsvps');
    it('Displays attending and not attending');
    it('Displays Accepted and rejected rsvps');
    it('Displays the correct dialog');
    it('Edits events successfully');
    it('Deletes events successfully');
    it('Reserves events successfully');
    it('Changes attendance successfully');
    it('Logs out successfully');
  });
});
