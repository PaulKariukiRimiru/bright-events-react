import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import GridItemComponent from './GridItemComponent';

configure({ adapter: new Adapter() });

describe("Component : GridItemComponent", () => {

    const minProps = {
        header : '',
        description : '',
        actons : {}
    }

    const mountWrapper = mount(<GridItemComponent {...minProps}/>)

    describe("component unit tests", () => {
        it("component renders correctly", () => {
            expect(mountWrapper).is.not.undefined
        })
        it("component renders a card", () => {
            expect(mountWrapper.find('Card')).to.be.lengthOf(1)
        })
        it("component card contains a header", () => {
            expect(mountWrapper.find('Card').find('CardHeader')).to.be.lengthOf(1)
        })
        it("component card component contains a header content and action", () => {
            expect(mountWrapper.find('Card').find('CardHeader')).to.be.lengthOf(1)
            expect(mountWrapper.find('Card').find('CardText')).to.be.lengthOf(1)
            expect(mountWrapper.find('Card').find('CardActions')).to.be.lengthOf(1)
        })
    })
})