import 'jsdom-global/register';
import { BrowserRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { MuiThemeProvider } from 'material-ui/styles';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationComponent from '../components/NavigationComponent';

configure({ adapter: new Adapter() });

describe('Component : NavigationComponent', () => {
  const mountWrapper = shallow(<MuiThemeProvider><NavigationComponent/></ MuiThemeProvider>);
  it('renders a material navigation drawer', () => {
    expect(mountWrapper.find('Drawer'))
      .to
      .be
      .lengthOf(1);
  });

  it('contains navigation links', () => {
    expect(mountWrapper.find('Drawer').children().length)
      .to
      .be
      .greaterThan(0);
  });
});
