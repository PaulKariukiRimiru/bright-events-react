import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';
import {spy } from 'sinon';
import LandingPage from './LandingPage';
import { Tab } from 'material-ui/Tabs';
import {ReactTestRenderer} from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe("Component : LandingPage", () => {
    let mountWrapper = null
    let shallowWrapper = null
    let sinonSpy = null
    beforeEach(() => {
        
        mountWrapper= mount(<LandingPage />)
        shallowWrapper = shallow(<LandingPage />)
    })
    
    describe("component unit tests", () => {

        it("component renders successfully", () => {
            expect(mountWrapper).to.be.not.undefined
        })
        it("component contains account creation and login div", () => {
            expect(mountWrapper.find('Login')).to.be.lengthOf(1)
            expect(mountWrapper.find('Register')).to.be.lengthOf(1)
        })
        it("component card contains header, text and acions sections", () => {
            expect(mountWrapper.find("Card").find("CardHeader")).to.be.lengthOf(1)
            expect(mountWrapper.find("Card").find("CardMedia")).to.be.lengthOf(1)
            expect(mountWrapper.find("Card").find("CardActions")).to.be.lengthOf(1)
        })
        it("component header has a title and sub-title", () => {
            expect(mountWrapper.find("CardHeader").prop("title")).to.be.not.undefined
            expect(mountWrapper.find("CardHeader").prop("subtitle")).to.be.not.undefined
        })
        it("account section contains a card with tabs and switcher", () => {
            expect(mountWrapper.find("Card").find("Tab"))
        })
        it("component has a tab with an icon and header", () => {
            expect(mountWrapper.find("Tab").children()).to.be.lengthOf(2)
            expect(mountWrapper.find("Tab").first().prop("icon")).to.be.not.undefined
            expect(mountWrapper.find("Tab").first().prop("label")).to.be.not.undefined

        })
        it("component has a description section", () => {
            expect(mountWrapper.find("p")).to.be.lengthOf(1)
        })
        it("component Tab change changes tabValue", () => {
            sinonSpy = spy(LandingPage.prototype, 'handleChange')
            const wrapper = shallow(<LandingPage />)

            expect(wrapper.state("tabValue")).to.equal(0)
            wrapper.find("Tabs").simulate("change")

            expect(sinonSpy.calledOnce).to.equal(true)
            expect(wrapper.state("tabValue")).to.equal(1)
        })
    })
})