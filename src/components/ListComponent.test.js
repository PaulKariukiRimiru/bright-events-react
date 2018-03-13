import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import ListComponent from './ListComponent';

configure({ adapter: new Adapter() });

describe("Component : ListComponent", () => {


    const minProps = {
        itemList : [],
        handleItemClick : () =>{}
    }

    const shallowWrapper = shallow(<ListComponent {...minProps} />)
    const mountWrapper = mount(<ListComponent {...minProps} itemList={["one"]}/>)

    describe("component unit tests", () => {
        it("renders correctly", () => {
            expect(shallowWrapper).is.not.undefined
        })
        it("contains a list", () => {
            expect(shallowWrapper.find("List")).to.be.lengthOf(1)
        })

        it("renders list items", () => {
            expect(mountWrapper.find("ListItem")).to.be.lengthOf(1)
        })
    })    
})

