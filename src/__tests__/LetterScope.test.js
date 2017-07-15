import React from "react";
import { mount } from "enzyme";
import { assert } from "chai";
import LetterScope from "../components/LetterScope";
import {LETTERS} from "../components/MorseLib";

const div = document.createElement("div");

it(`renders all elements contained in the LETTERS array`, () => {
  const wrapper = mount(<LetterScope scope={ [] } />);
  const elementCount = wrapper.find("a").length;
  assert.equal(elementCount, LETTERS.length );
});
