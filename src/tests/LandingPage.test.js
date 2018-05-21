import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { afterEach } from 'mocha';

import { NewLandingPage } from '../pages/NewLandingPage';

const setUp = (isMount) => {
  const minProps = {
    fetching: false,
    message: '',
    displayed: true,
    loginUser: (userDetails, callBack) => {},
    registerUser: (userDetails, callBack) => {}
  };
  if (isMount) {
    return mount(<NewLandingPage {...minProps} />);
  }
  return shallow(<NewLandingPage {...minProps} />);
};
describe('Component : Landing Page', () => {
  describe('Render tests', () => {
    const wrapper = setUp(true);
    it('Renders a container GridComponent', () => {
      expect(wrapper.find({ container: true }).length).to.be.greaterThan(0, 'GridComponent container missing');
    });
    it('Renders GridComponent items', () => {
      expect(wrapper.find({ item: true }).length).to.be.greaterThan(0, 'there are no GridComponent items');
    });
    it('Renders a Dialog Component', () => {
      expect(wrapper.find('NewDialog').exists()).to.be.equal(true, 'cannot find dialog');
    });
    it('Renders a Notification component', () => {
      wrapper.setProps({
        message: { status: true, message: 'test' }
      });
      expect(wrapper.find('NotificationComponent').exists()).to.be.equal(true, 'cannot find notification');
    });
    it('Renders a toolbar with a button', () => {
      expect(wrapper.find('Toolbar').exists()).to.be.equal(true, 'cannot fing toolbar');
      const toolbar = wrapper.find('Toolbar');
      expect(toolbar.find('Button').exists()).to.be.equal(true, 'cannot find button');
    });
    it('Renders parallax with five pages', () => {
      expect(wrapper.find({ pages: 5 }).exists()).to.be.equal(true, 'cannot find parallax component');
    });
  });
  describe('Events tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp(true);
    });

    afterEach(() => {
      wrapper.unmount();
    });
    it('displays account dialog on click', () => {
      expect(wrapper.find('NewDialog').prop('openDialog')).to.be.equal(false);
      const button = wrapper.find('button');
      button.first().simulate('click');
      expect(wrapper.find('NewDialog').prop('openDialog')).to.be.equal(true);
    });
    it('closes dialog', () => {
      const instance = wrapper.instance();
      const closeDiag = spy(instance, 'handleDialogClose');
      expect(wrapper.find('NewDialog').prop('openDialog')).to.be.equal(false);
      const button = wrapper.find('button');
      button.first().simulate('click');
      expect(wrapper.find('NewDialog').prop('openDialog')).to.be.equal(true);
      instance.handleDialogClose();
      expect(closeDiag.calledOnce);
      expect(wrapper.find('NewDialog').prop('openDialog')).to.be.equal(true);
    });
    it('register called with correct data', () => {
      wrapper.setState({
        userDetails: {
          username: 'test',
          email: 'test@email.com',
          password: 'Abc123!'
        }
      });
      wrapper.setProps({
        registerUser: stub()
      });
      const propsReg = wrapper.prop('registerUser');
      const instance = wrapper.instance();
      instance.handleRegistrationFormSubmit();
      expect(propsReg.calledOnceWith({
        username: 'test',
        email: 'test@email.com',
        password: 'Abc123!'
      })).to.be.equal(true);
    });
    it('Login is called with correct data', () => {
      wrapper.setState({
        userDetails: {
          email: 'test@email.com',
          password: 'Abc123!'
        }
      });
      wrapper.setProps({
        loginUser: stub()
      });
      const propsReg = wrapper.prop('loginUser');
      const instance = wrapper.instance();
      instance.handleLoginFormSubmit();
      expect(propsReg.calledOnceWith({
        email: 'test@email.com',
        password: 'Abc123!'
      })).to.be.equal(true);
    });
  });
});
