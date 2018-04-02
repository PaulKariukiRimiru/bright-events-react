import 'jsdom-global/register';

import React from 'react'
import chai, {expect} from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import Login from './Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

configure({ adapter: new Adapter() });


describe("Component : Login", () => {
    const shallowWrapper = shallow(<MuiThemeProvider><Login /></MuiThemeProvider>);
    const mountWrapper = mount(<MuiThemeProvider><Login /></MuiThemeProvider>);

    describe("unit tests for the login component", () => {
        it("component renders", () => {
            expect(shallowWrapper).to.not.be.undefined;
        })
        it("component contains a form", () => {
            expect(mountWrapper.find('form')).to.be.lengthOf(1);
        })
        it("comoponent form contains an email and password field", () => {
            expect(mountWrapper.find('form').children()).to.be.lengthOf(3)
            expect(mountWrapper.find('form').childAt(0).find('TextField').prop('refs')).to.be.equal("emailField")
            expect(mountWrapper.find('form').childAt(1).find('TextField').prop('refs')).to.be.equal("passwordField")
        })
        it("component form has a submit button", () => {
            expect(mountWrapper.find('form').childAt(2).find("RaisedButton").prop("name")).to.be.equal("submit")
        })
    })
    
})