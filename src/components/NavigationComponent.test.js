import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import NavigationComponent from './NavigationComponent';

configure({ adapter: new Adapter() });

describe("Component : NavigationComponent", () => {

    const mountWrapper = mount(<NavigationComponent />)
    it('renders a material navigation drawer', () => {
        expect(mountWrapper.find("Drawer")).to.be.lengthOf(1)
    })

    it('contains navigation links', () => {
        expect(mountWrapper.find('Drawer').children().length).to.be.greaterThan(0)
    })

})