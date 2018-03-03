import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import chai , {expect} from 'chai';

import { configure } from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('div')).to.not.be.undefined
});
