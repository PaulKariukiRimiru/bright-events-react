import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import {configure, shallow, mount} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

import GridComponent from './GridComponent';

configure({ adapter: new Adapter() });

describe("Component : GridComponent", () => {

    const minProps = {
        itemList :[],
        handleClick :()=>{}
    }

    const shallowWrapper = shallow(<GridComponent {...minProps}/>)
    const mountWrapper = mount(<GridComponent {...minProps} itemList = {["one"]}/>)

    describe("component unit tests", () => {
        it("component renders", () => {
            expect(shallowWrapper).to.be.not.undefined
        })
        it("component contains a grid", () => {
            expect(mountWrapper.find('GridList')).to.be.lengthOf(1)
        })
        it("component grid renders grid items", () => {
            expect(mountWrapper.find('GridList').children()).to.be.lengthOf(1)
        })
        it("component grid receives props", () => {
            expect(mountWrapper.prop('itemList')[0]).to.be.equal("one")
        })
    })

    describe("component utility tests", () => {

    })
    
})