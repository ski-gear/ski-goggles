import { expect } from "chai";
import * as Enzyme from "enzyme";
import "mocha";
import * as React from "react";
import { Image, Label } from "semantic-ui-react";
import { ProviderCanonicalName } from "ski-vendors";
import { Formatting } from "ski-vendors/dist/types/Types";
import Title from "../Title";

describe("Title", () => {
  const time = 1514790565000;
  const payload = {
    browserRequestId: "35946-1",
    data: {
      data: [
        {
          category: null,
          formatting: "string" as Formatting,
          label: "AQB",
          value: "1",
        },
      ],
      meta: {
        title: "Event",
      },
    },
    provider: {
      canonicalName: "AdobeAnalyticsAppMeasurement" as ProviderCanonicalName,
      displayName: "Adobe Analytics AppMeasurement",
      logo: "adobe-analytics-app-measurement.png",
      pattern: /./,
      transformer: () => [],
    },
    timeStamp: 1641528195448,
    url: "https://smetrics.realestate.com.au",
  };

  const titleComponent = Enzyme.mount(
    <Title
      logo="stuff-logo"
      provider="AdobeAnalyticsAppMeasurement"
      title="stuff-title"
      timeStamp={time}
      payload={payload}
    />,
  );

  it("Generates the correct logo", () => {
    const logo = titleComponent.find(Image);
    expect(logo.props().src).to.eq("images/providers/stuff-logo");
  });

  it("Generates the correct title", () => {
    const title = titleComponent;
    expect(title.text()).to.contain("stuff-title");
  });

  it("Generates the formatted time", () => {
    const title = titleComponent;
    expect(title.text()).to.contain("Jan 1st 18:09:25 PM");
  });

});
