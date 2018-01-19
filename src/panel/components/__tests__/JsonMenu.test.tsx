import "mocha";

import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import { Button } from "semantic-ui-react";

import JsonMenu from "../JsonMenu";

describe("JsonMenu", () => {
  const jsonMenu = Enzyme.mount(<JsonMenu value="stuff" />);

  it("Changes the Menu text when clicked", async () => {
    const button = jsonMenu.find(Button);
    button.simulate("click");
    expect(button.text()).to.match(/Copied/);
    const a = new Promise(resolve => {
      setTimeout(() => {
        resolve(button.text());
      }, 2100);
    });
    const text = await a;
    expect(text).to.match(/Copy/);
  });
});
