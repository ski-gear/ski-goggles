import * as React from "react";
import * as Enzyme from "enzyme";
import { expect } from "chai";
import Title from "../Title";
import "mocha";
import { Image, Label } from "semantic-ui-react";

describe("Title", () => {
  const time = 1514790565000
  const titleComponent = Enzyme.mount(<Title logo="stuff-logo" title="stuff-title" timeStamp={time}/>);

  it("Generates the correct logo", () => {
    const logo = titleComponent.find(Image);
    expect(logo.props()['src']).to.eq("images/providers/stuff-logo");
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
