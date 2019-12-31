import "mocha";

import { expect } from "chai";
import * as chai from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import rewiremock from "rewiremock";
import * as Sinon from "sinon";

import { OPEN_ISSUES_PAGE, OPEN_OPTIONS_TAB } from "../../../Constants";

chai.use(require("sinon-chai"));

describe("MenuBar", () => {
  let mock: any;
  let menuBarComponent: Enzyme.ReactWrapper<any, any>;

  const srtSpy = Sinon.spy();
  const clearSpy = Sinon.spy();
  const chromeId = "awesome-chrome-id";

  beforeEach(async () => {
    mock = await rewiremock.module(() => import("../MenuBar"), {
      "../Helpers": { SendRuntimeMessage: srtSpy },
    });
    const MenuBar = mock.default;
    menuBarComponent = Enzyme.mount(<MenuBar clear={clearSpy} chromeId={chromeId} />);
  });

  describe("bug link", () => {
    it("when clicked, calls the SendRuntimeMessage with the right args", () => {
      const button = menuBarComponent.find({ name: "bug" });
      button.simulate("click");
      expect(srtSpy).to.have.been.calledWith(chromeId, OPEN_ISSUES_PAGE, {});
    });
  });

  describe("options link", () => {
    it("when clicked, calls the SendRuntimeMessage with the right args", () => {
      const button = menuBarComponent.find({ name: "options" });
      button.simulate("click");
      expect(srtSpy).to.have.been.calledWith(chromeId, OPEN_OPTIONS_TAB, {});
    });
  });

  describe("clear link", () => {
    it("when clicked, calls the clear function passed into props", () => {
      const button = menuBarComponent.find({ name: "trash" });
      button.simulate("click");
      expect(clearSpy).to.have.been.called;
    });
  });
});
