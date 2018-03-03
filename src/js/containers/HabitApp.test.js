import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import HabitApp from './HabitApp';

const wrapper = mount(<HabitApp />);

describe('HabitApp test component mounts', () => {
    it('renders h1', () => {
        expect(wrapper.find('h1').text()).to.equal('React up and running');
    });
})
