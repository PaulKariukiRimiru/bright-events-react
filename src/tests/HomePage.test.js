import 'jsdom-global/register';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { MuiThemeProvider } from 'material-ui/styles';
import { spy, assert } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import GridComponent from '../components/GridComponent';
import HomePage from '../pages/HomePage';

configure({ adapter: new Adapter() });

describe('Component : HomePage', () => {
  const minProps = {
    events: []
  };
  it('contains a grid to display information', () => {
    const eventsSpy = spy(HomePage.prototype, 'renderEvents');
    const eventsWrapper = mount(<MuiThemeProvider>
        <HomePage {...minProps} events={['one', 'two']}/>
      </MuiThemeProvider>);
    assert.calledOnce(eventsSpy);
    expect(eventsWrapper.find('GridComponent'))
      .to
      .be
      .lengthOf(1);
  });
  it('contains a text view if there s no information', () => {
    const emptySpy = spy(HomePage.prototype, 'renderEmpty');
    const emptyWrapper = mount(<MuiThemeProvider>
        <HomePage {...minProps}/>
      </MuiThemeProvider>);
    assert.calledOnce(emptySpy);
    expect(emptyWrapper.find('h4'))
      .to
      .be
      .lengthOf(1);
  });
});
