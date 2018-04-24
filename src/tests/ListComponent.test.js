import 'jsdom-global/register';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

import ListComponent from '../components/ListComponent';

configure({ adapter: new Adapter() });

describe('Component : ListComponent', () => {
  const minProps = {
    rsvpList: [],
    handleItemClick: () => {}
  };

  const rsvp = {
    event_id: '1',
    email: 'myemail',
    accepted: true
  };

  const mountWrapper = mount(<MuiThemeProvider>
      <ListComponent {...minProps} rsvpList={[rsvp]}/>
    </ MuiThemeProvider>);

  describe('component unit tests', () => {
    it('renders correctly', () => {
      expect(mountWrapper).is.not.undefined;
    });
    it('contains a list', () => {
      expect(mountWrapper.find('List'))
        .to
        .be
        .lengthOf(1);
    });

    it('renders list items', () => {
      expect(mountWrapper.find('ListItem'))
        .to
        .be
        .lengthOf(1);
    });
  });
});
