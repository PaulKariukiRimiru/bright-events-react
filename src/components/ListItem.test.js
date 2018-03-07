import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import ListItem from './ListItem';

configure({ adapter: new Adapter() });

describe("Component : ListItem", () => {
    const mountWrapper = mount(<ListItem />)

    describe("comoponent unit tests", () => {
        it("Renders correctly", () => {
            expect(mountWrapper).to.be.not.undefined
        })
        it("Component contains a card", () => {
            expect(mountWrapper.find("Card")).to.be.lengthOf(1)
        })
        it("component card contains header, text and action segments", () => {
            expect(mountWrapper.find("Card").find("CardHeader")).to.be.lengthOf(1)
            expect(mountWrapper.find("Card").find("CardText")).to.be.lengthOf(1)
            expect(mountWrapper.find("Card").find("CardActions")).to.be.lengthOf(1)
        })
    })
})