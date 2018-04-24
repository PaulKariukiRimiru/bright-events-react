import 'jsdom-global/register';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { MuiThemeProvider } from 'material-ui/styles';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import GridItemComponent from '../components/GridItemComponent';

configure({ adapter: new Adapter() });

describe('Component : GridItemComponent', () => {
  const minProps = {
    event: {},
  };

  const event = {
    name: 'name',
    category: 'category',
    date: '1/1/2018',
    location: 'location'
  };

  const mountWrapper = mount(<MuiThemeProvider>
      <GridItemComponent {...minProps}/>
    </MuiThemeProvider>);

  describe('component unit tests', () => {
    it('component renders correctly', () => {
      expect(mountWrapper).is.not.undefined;
    });
    it('component renders a card', () => {
      expect(mountWrapper.find('Card'))
        .to
        .be
        .lengthOf(1);
    });
    it('component card contains a header', () => {
      expect(mountWrapper.find('Card').find('CardHeader'))
        .to
        .be
        .lengthOf(1);
    });
    it('component card component contains a header content and action', () => {
      expect(mountWrapper.find('Card').find('CardHeader'))
        .to
        .be
        .lengthOf(1);
      expect(mountWrapper.find('Card').find('CardText'))
        .to
        .be
        .lengthOf(1);
      expect(mountWrapper.find('Card').find('CardActions'))
        .to
        .be
        .lengthOf(1);
    });
  });
});
