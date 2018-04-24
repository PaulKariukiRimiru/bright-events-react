import 'jsdom-global/register';
import { configure, mount } from 'enzyme';
import { spy, assert } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import React from 'react';
import MuiTheme from 'material-ui/styles/MuiThemeProvider';

import { DashBoard } from '../pages/DashBoard';

configure({ adapter: new Adapter() });

describe('Compoonent : DashBoard', () => {
  const minProps = {
    events: []
  };

  it('renders a grid with information', () => {
    const eventsSpy = spy(DashBoard.prototype, 'renderGrid');
    const eventsWrapper = mount(<DashBoard {...minProps} events={['one', 'two']}/>);

    assert.calledOnce(eventsSpy);
    expect(eventsWrapper.find('GridComponent'))
      .to
      .be
      .lengthOf(1);
  });
  it('renders a text description when there is no information', () => {
    const emptySpy = spy(DashBoard.prototype, 'renderEmpty');
    const emptyWrapper = mount(<DashBoard {...minProps}/>);

    assert.calledOnce(emptySpy);
    expect(emptyWrapper.find('h4'))
      .to
      .be
      .lengthOf(1);
  });
});
