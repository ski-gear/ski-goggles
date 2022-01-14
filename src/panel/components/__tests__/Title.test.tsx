import "mocha";
import { expect } from "chai";
import * as Enzyme from "enzyme";
import * as React from "react";
import { Image, Label } from "semantic-ui-react";
import Title from "../Title";
import { ProviderCanonicalName } from "ski-vendors";
import { Formatting } from "ski-vendors/dist/types/Types";

describe("Title", () => {
  const time = 1514790565000;
  const payload = {
    browserRequestId: "35946-1",
    url: "https://smetrics.realestate.com.au",
    timeStamp: 1641528195448,
    provider: {
      canonicalName: "AdobeAnalyticsAppMeasurement" as ProviderCanonicalName,
      displayName: "Adobe Analytics AppMeasurement",
      logo: "adobe-analytics-app-measurement.png",
      pattern: /./,
      transformer: () => [],
    },
    data: {
      meta: {
        title: "Event",
      },
      data: [
        {
          label: "AQB",
          value: "1",
          formatting: "string" as Formatting,
          category: null,
        },
      ],
    },
  };

  const titleComponent = Enzyme.mount(
    <Title
      logo="stuff-logo"
      provider="AdobeAnalyticsAppMeasurement"
      title="stuff-title"
      timeStamp={time}
      payload={payload}
    />
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
    const title = titleComponent.find(Label);
    expect(title.text()).to.contain("Jan 1st 2018 18:09:25");
  });

  
});