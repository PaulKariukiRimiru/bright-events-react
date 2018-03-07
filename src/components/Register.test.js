import 'jsdom-global/register';

import React from 'react';
import chai, {expect} from 'chai';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from './Register';

configure({ adapter: new Adapter() });

describe("Component : Register", () => {
    const shallowWrapper = shallow(<Register />)
    const mountWrapper = mount(<Register />)

    describe("unit tests for Register component", () => {
        it("component renders", () => {
            expect(shallowWrapper).is.not.undefined;
        });
        it("component contains a form", () => {
            expect(mountWrapper.find('form')).is.of.length(1)
        });
        it("component form contains email, username and password fields and button", () => {
            expect(mountWrapper.find('form').children()).is.of.length(4)
        });
        it("component has a submit button", () => {
            expect(mountWrapper.find('form').childAt(3).find('RaisedButton')).is.of.length(1)
        });
    });
})
