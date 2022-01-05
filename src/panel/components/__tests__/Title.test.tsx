import "mocha";

import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import { Image, Label } from "semantic-ui-react";

import Title from "../Title";

describe("Title", () => {
  const time = 1514790565000;
  const titleComponent = Enzyme.mount(<Title logo="stuff-logo" title="stuff-title" timeStamp={time} primaryInfo="placeholder" />);

  it("Generates the correct logo", () => {
    const logo = titleComponent.find(Image);
    expect(logo.props().src).to.eq("images/providers/stuff-logo");
  });

  it("Generates the correct title", () => {
    const title = titleComponent;
    expect(title.text()).to.contain("stuff-title");
  });

  it("Generates the formatted time", () => {
    const title = titleComponent.find(Label);
    expect(title.text()).to.contain("January 1st 2018 18:09:25:000");
  });
});
