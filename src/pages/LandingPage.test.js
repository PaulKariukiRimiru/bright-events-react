import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import LandingPage from './LandingPage';
import { Tab } from 'material-ui/Tabs';

configure({ adapter: new Adapter() });

describe("Component : LandingPage", () => {
    let mountWrapper = null
    let shallowWrapper = null
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
        it("component has the correct states", () => {
            expect(mountWrapper.state("tabValue")).to.equal(0)
        })
    })
})