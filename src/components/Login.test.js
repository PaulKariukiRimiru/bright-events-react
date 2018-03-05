import 'jsdom-global/register';

import React from 'react'
import chai, {expect} from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import Login from './Login';

configure({ adapter: new Adapter() });


describe("Component : Login", () => {
    const shallowWrapper = shallow(<Login />);
    const mountWrapper = mount(<Login />);

    describe("unit tests for the login component", () => {
        it("component renders", () => {
            expect(shallowWrapper).to.not.be.undefined;
            expect(shallowWrapper.find('div')).to.be.lengthOf(1);
        })
        it("component contains a form", () => {
            expect(shallowWrapper.find('form')).to.be.lengthOf(1);
        })
        it("comoponent form contains an email and password field", () => {
            expect(mountWrapper.find('form').children()).to.be.lengthOf(3)
            expect(mountWrapper.find('form').childAt(0).find('TextField')).to.be.lengthOf(1)
            expect(mountWrapper.find('form').childAt(1).find('TextField')).to.be.lengthOf(1)
        })
        it("component form has a submit button", () => {
            expect(mountWrapper.find('form').childAt(2).find("RaisedButton")).to.be.lengthOf(1)
        })
    })
    
})