import React from 'react';
import { mount } from 'enzyme';
import { assert } from 'chai';
import { MorseChar } from '../TypingScreen/Morse';

const div = document.createElement('div');

for (test of [
    { char: "a", code: ".-" },
    { char: "e", code: "." },
    { char: "A", code: ".-" },
    { char: "ö", code: "?" }]) {
    
    const { char, code } = test;

    it(`renders ${char} -> ${code}`, () => {
        const wrapper = mount(<MorseChar char={char} />);
        const morseText = wrapper.find("span.morseCode").text();    
        assert.equal(morseText, code);
    });
}

