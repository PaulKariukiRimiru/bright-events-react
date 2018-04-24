import 'jsdom-global/register';
import { configure, shallow, mount } from 'enzyme';
import { MuiThemeProvider } from 'material-ui/styles';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import configureStore from 'redux-mock-store';
import React from 'react';

import Register from '../components/Register';

configure({ adapter: new Adapter() });

describe('Component : Register', () => {
  const shallowWrapper = shallow(<MuiThemeProvider><Register/></ MuiThemeProvider>);
  const mountWrapper = mount(<MuiThemeProvider><Register/></ MuiThemeProvider>);

  describe('unit tests for Register component', () => {
    it('component renders', () => {
      expect(shallowWrapper).is.not.undefined;
    });
    it('component contains a form', () => {
      expect(mountWrapper.find('form'))
        .is
        .of
        .length(1);
    });
    it('component form contains email, username and password fields and button', () => {
      expect(mountWrapper.find('form').children())
        .is
        .of
        .length(4);
    });
    it('component has a submit button', () => {
      expect(mountWrapper.find('form').childAt(3).find('RaisedButton'))
        .is
        .of
        .length(1);
    });
  });
});
